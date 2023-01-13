package com.example.mapstudy.service;

import com.example.mapstudy.vo.IntersectionVO;
import com.example.mapstudy.vo.SearchVO;

import java.util.List;

public interface ProjectService {
    List<IntersectionVO> selectArea(SearchVO searchVO);
}
