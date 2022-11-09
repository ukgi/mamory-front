package com.example.mapmory.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
public class UserInfo {
    private static final String requestURL = "https://kapi.kakao.com/v2/user/me";
    private static final HashMap<String, Object> userInfo = new HashMap<String, Object>();
    private URL url = new URL(requestURL);
    private HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();

    public UserInfo() throws IOException {
    }

    public int setHttpURLConnection(String accessToken) throws IOException {
        httpURLConnection.setRequestProperty("Authorization", "Bearer " + accessToken);//헤더값
        httpURLConnection.setRequestMethod("GET");
        return httpURLConnection.getResponseCode();
    }

    public String getUserInfoFromKaKao() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        String line = "";
        String result = "";
        while ((line = br.readLine()) != null) {
            result += line;
        }

        return result;
    }
    public HashMap<String, Object> getUserInfo(String accessToken) throws IOException {
            System.out.println("서버응답:" + setHttpURLConnection(accessToken));
            System.out.println("유저정보 : " + getUserInfoFromKaKao());
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parseString(getUserInfoFromKaKao());

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);

        return userInfo;
    }
}

