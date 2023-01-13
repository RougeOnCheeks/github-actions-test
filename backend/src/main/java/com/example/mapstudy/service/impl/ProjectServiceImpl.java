package com.example.mapstudy.service.impl;

import com.example.mapstudy.mapper.ProjectMapper;
import com.example.mapstudy.service.ProjectService;
import com.example.mapstudy.vo.IntersectionVO;
import com.example.mapstudy.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectMapper projectMapper;

    @Override
    public List<IntersectionVO> selectArea(SearchVO searchVO) {
        return projectMapper.selectArea(searchVO);
    }
}
