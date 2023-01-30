## CI/CD 실습
- 배포 환경: EC2 - Amazon Linux (CentOS)
- 사용 도구
    - 빌드: Github Action
    - 배포: AWS CodeDeploy
- 프로젝트 구조: 모노레포 형식으로 구성 (기존 실습 프로젝트 활용)
    - Frontend: React.js
    - Backend: Spring Boot 
- 프로세스 구성
    - Github remote의 dev, prd 브랜치에 push
    - Github Action에서 workflow 실행
      - dependency install
      - build
      - S3 bucket에 업로드
      - CodeDeploy trigger
    - CodeDeploy에서 S3 bucket에 있는 빌드파일 다운로드
    - CodeDeploy에서 빌드파일 EC2에 업로드
- AWS 준비사항
    1. S3 생성
        - 배포할 소스 파일 올리는 용도
        - S3 → 버킷 만들기 → 이름, 리전 설정 후 나머지 설정 그대로 두고 저장
    2. EC2에 codedeploy agent 설치
        - EC2에 코드 디플로이가 접근하여 파일을 올릴 수 있도록 하기 위함
        - Ubuntu: [https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html)
        - Centos: [https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html)
        
        ```bash
        sudo yum update
        sudo yum install ruby
        sudo yum install wget 
        cd /home/centos # 홈 뒤에 폴더는 서버가 기본으로 만들어준 폴더명을 넣으면 된다.
        wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install # northeast-2 는 리전에 따라 변경할것
        chmod +x ./install
        sudo ./install auto
        # 서비스가 실행 중인지 확인
        # The AWS CodeDeploy agent is running. 와 같은 메시지가 출력되면 성공
        sudo service codedeploy-agent status
        ```
        
    3. IAM 생성
        - AWS console → IAM → 사용자 추가
            - 액세스 유형: 프로그래밍 방식 액세스
            - 권한 설정: 기존 정책 직접 연결 → AmazonS3FullAccess, CodeDeployFullAccess 선택
            - **생성 완료 후 accees-key와 secret-access-key CSV파일 저장!!**
    4. EC2 IAM 설정
        - EC2가 S3와 CodeDeploy를 접근해서 이용할 수 있도록 하는 권한 부여
        - 이미 연결된 역할이 있다면 기존 역할에 정책 추가만 하면 됨
        - IAM → 역할 → 역할 만들기
        - EC2를 선택하고 ‘다음’버튼 클릭
        - 권한 정책 연결: AWSCodeDeployFullAccess, AmazonS3FullAccess 선택
        - 역할 이름을 설정 ex. EC2-Deploy
        - **생성이 된 IAM를 EC2에 연결해준다.**
            - EC2 우클릭 → 보안 → IAM 역할 수정
            - 연결 후 EC2 인스턴스를 재부팅
    5. EC2에 awscli 설치 및 key 등록 
        - 기존에 등록된 key가 있다면 굳이 등록하지 않아도 되는것 같다. 기존 key로 두고 codedeploy 하는데에는 문제가 없었다.
        
        ```bash
        $ sudo apt update
        $ sudo apt install awscli
        # 설치 확인
        $ aws help
        # 사용자 설정
        $ aws configure
        AWS Access Key ID [None]: 액세스 키를 입력
        AWS Secret Access Key [None]: 시크릿 액세스 키를 입력
        Default region name [None]: ap-northeast-2 # 혹시 리전이 다르면 해당 리전 기입
        Default output format [None]: 그냥 Enter 입력
        ```
    6. CodeDeploy IAM 설정
        - CodeDeploy가 S3에서 파일을 받아서 EC2에 올리기 위한 역할 추가
        - IAM → 역할 → 역할 만들기
        - 사용사례: CodeDeploy 선택
        - 역할: AWSCodeDeployRole
        - 이름 설정 후 생성 완료 ex. myapp-code-deploy
    7. CodeDeploy 애플리케이션 생성, 배포 구성 생성
        - CodeDeploy → 애플리케이션 → 애플리케이션 생성
            - **컴퓨팅 플랫폼: EC2/온프레미스**
        - 생성한 애플리케이션 선택 → 배포그룹 → 배포그룹 생성
            - 서비스 역할: 생성해둔 IAM 클릭       
            - 배포유형: 현재 위치
            - 환경구성: Amazon EC2 인스턴스
                - 키: Name, 값: EC2 인스턴스 또는
                - 인스턴스 tag 그룹이 있다면 키: tag, 값: tag 에 지정한 값
                - EC2 숫자만큼 태그 추가하여 생성
                - 필요시 태그그룹을 추가하여 그룹핑
            - AWS Systems Manager를 사용한 에이전트 구성은 기본값으로 두기
            - 배포 설정
                - 인스턴스 환경에 따라 다르게 설정해야 함
                - 로드밸런서 유무에 따라 로드밸런싱 활성화 여부 체크 
                - 배포 구성: 인스턴스 환경에 알맞은 배포구성 선택
                    - 참고 문서: https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/deployment-configurations.html
- Github Action 설정
    - workflow를 실행할 Action Runner 설정
        - self-hosted의 경우 Settings - Actions - Runners에서 추가
        - github 가이드에 따라 진행
    - Github Action 이 S3에 접근하여 파일을 업로드 할 수 있도록 IAM 사용자 추가 및 권한 설정을 해준다.
    - AWS에 접근하여 작업하기 위한 액세스키들을 원하는 깃헙 리파지토리에 올려둬야 한다.
    - 깃헙 리파지토리 → Settings → Secrets → New repository secret 버튼을 눌러 액세스 키들을 저장한다.
        - Name에 키 이름, Value에 IAM 사용자 생성 후 발급받은 키를 넣는다.
        - 지정한 이름은 추후에 workflow yml파일에 변수로 사용된다.
        - 나의 경우 AWS_ACCESS_KEY_ID 에는 access-key, AWS_SECRET_ACCESS_KEY 에는 secret-access-key, AWS_REGION 에는 ap-northeast-2로 지정했다.                
    - workflow 작성
        - 애플리케이션 root directory 기준 .github/workflows 에 workflow파일이름.yml 생성
        - 각 branch에 push 또는 pull request 될때 실행할 작업들을 step에 차례대로 작성한다.
        - 소스 체크아웃, 의존성 파일 설치, 빌드, zip 파일 생성, S3 업로드, codedeploy trigger
- Application 설정
    - root 디렉토리 기준으로 appspec.yml 파일 생성
    - 배포할 파일 지정, permission 지정, hook 지정