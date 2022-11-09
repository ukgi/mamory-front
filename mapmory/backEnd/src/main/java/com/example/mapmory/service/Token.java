package com.example.mapmory.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class Token {
    private static final String requestURL = "https://kauth.kakao.com/oauth/token";
    private String access_Token = "";
    private URL url = new URL(requestURL);
    private HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();

    public Token() throws IOException {
    }

    public void setHttpConnection() throws IOException {
        httpURLConnection.setDoOutput(true);
        httpURLConnection.setRequestMethod("POST");
    }

    public String appendToken(String code) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("grant_type=authorization_code");
        stringBuilder.append("&client_id=fc231655583778a23c2eba6fcbd54a3f"); //본인이 발급받은 key
        stringBuilder.append("&redirect_uri=http://localhost:8080/mapmory/callbackKakao"); // 본인이 설정한 주소
        stringBuilder.append("&code=" + code);

        return stringBuilder.toString();
    }

    public void setBufferWriter(String code) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(httpURLConnection.getOutputStream()));
        bufferedWriter.write(appendToken(code));
        bufferedWriter.flush();
        bufferedWriter.close();
    }

    public String getTokenFromKakao() throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        String line = "";
        String result = "";
        while ((line = bufferedReader.readLine()) != null) {
            result += line;
        }
        return result;
    }

    public String getAccessToken(String code) throws IOException {

        setHttpConnection();
        setBufferWriter(code);
        int responseCode = httpURLConnection.getResponseCode();
        System.out.println("서버응답 : " + responseCode);

        JsonElement element = JsonParser.parseString(getTokenFromKakao());
        access_Token = element.getAsJsonObject().get("access_token").getAsString();

        return access_Token;
    }


}
