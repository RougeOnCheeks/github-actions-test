package com.example.mapstudy.mapper;

import com.example.mapstudy.vo.IntersectionVO;
import com.example.mapstudy.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProjectMapper {
    List<IntersectionVO> selectArea(SearchVO searchVO);
}
