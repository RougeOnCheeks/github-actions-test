package com.example.mapstudy.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/kakaoMain")
@Log4j2
public class MainController {

    @GetMapping("/map")
    public void kakaoMain(){
        log.info("map page");
    }

    @GetMapping("/marker")
    public void kakaoOverlay(){
        log.info("marker page");
    }

    @GetMapping("/multipleMarker")
    public void kakaoOverlay2(){
        log.info("multipleMarker page");
    }

    @GetMapping("/drawFigure")
    public void drawFigure(){
        log.info("drawFigure page");
    }

    @GetMapping("/calculatePolylineDistance")
    public void calculatePolylineDistance(){
        log.info("calculatePolylineDistance page");
    }

    @GetMapping("/calculatePolygonArea")
    public void calculatePolygonArea(){
        log.info("calculatePolygonArea page");
    }

    @GetMapping("/addPolygonMouseEvent1")
    public void addPolygonMouseEvent1(){
        log.info("addPolygonMouseEvent1 page");
    }

    @GetMapping("/addPolygonMouseEvent2")
    public void addPolygonMouseEvent2(){
        log.info("addPolygonMouseEvent2 page");
    }

    @GetMapping("/calculateCircleRadius")
    public void calculateCircleRadius(){
        log.info("calculateCircleRadius page");
    }
}

