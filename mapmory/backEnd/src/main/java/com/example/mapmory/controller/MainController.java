package com.example.mapmory.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/kakaomain")
    public String showMainView()
    {
        return "hrloaso";
    }
}
