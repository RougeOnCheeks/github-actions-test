package com.example.mapstudy.controller;

import com.example.mapstudy.service.ProjectService;
import com.example.mapstudy.vo.IntersectionVO;
import com.example.mapstudy.vo.SearchVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/project")
@Log4j2
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/main")
    public void main(){
        log.info("main page");
    }

    @PostMapping("/mainApi")
    @ResponseBody
    public ResponseEntity mainApi(SearchVO searchVO){
        List<IntersectionVO> list = projectService.selectArea(searchVO);
        return new ResponseEntity(list, HttpStatus.OK);
    }
}
