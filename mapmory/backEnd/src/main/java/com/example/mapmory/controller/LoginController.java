package com.example.mapmory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {

    @GetMapping("mapmory/kakaologin")
    public String enterKakaoLoginPage(){


        return "kakaologin";
    }

}
