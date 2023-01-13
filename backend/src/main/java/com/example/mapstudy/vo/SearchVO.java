package com.example.mapstudy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class SearchVO {
    String territory;
    String startDateTime;
    String endDateTime;
    double minLat;
    double maxLat;
    double minLon;
    double maxLon;


}
