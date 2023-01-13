package com.example.project;

import com.example.mapstudy.MapStudyApplication;
import com.example.mapstudy.mapper.ProjectMapper;
import com.example.mapstudy.vo.IntersectionVO;
import com.example.mapstudy.vo.SearchVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest(classes = MapStudyApplication.class)
public class MapTest {

    @Autowired
    private ProjectMapper projectMapper;

    @Test
    public void selectArea(){
        SearchVO searchVO = new SearchVO();
        searchVO.setTerritory("");
        searchVO.setStartDateTime("20220705193000");
        searchVO.setEndDateTime("20220812200000");
        searchVO.setMaxLat(36.37687069878344);
        searchVO.setMaxLon(127.42231961929753);
        searchVO.setMinLat(36.3450084560818);
        searchVO.setMinLon(127.32964434617769);
        List<IntersectionVO> list = projectMapper.selectArea(searchVO);
        System.out.println(list);

    }


}
