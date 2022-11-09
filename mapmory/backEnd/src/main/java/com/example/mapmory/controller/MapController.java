package com.example.mapmory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MapController {
    @GetMapping(value = "mapmory/kakaomap")
    public String enterKakaoMapPage(){
        return "kakaomap";
    }

}
