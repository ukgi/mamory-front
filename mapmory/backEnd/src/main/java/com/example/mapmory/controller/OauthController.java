package com.example.mapmory.controller;

import com.example.mapmory.service.Token;
import com.example.mapmory.service.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;

@Controller
@RequestMapping(value="/mapmory")
public class OauthController {

    @Autowired
    private Token token;

    @Autowired
    private UserInfo info;

    @RequestMapping(value="/callbackKakao", method= RequestMethod.GET)
    public void enterKakaoLoginPage(@RequestParam(value = "code", required = false) String code) throws Exception {
        String access_Token = token.getAccessToken(code);
        HashMap<String, Object> userInfo = info.getUserInfo(access_Token);
        System.out.println("이름 : " + userInfo.get("nickname"));
        System.out.println("이메일 : " + userInfo.get("email"));
    }

}