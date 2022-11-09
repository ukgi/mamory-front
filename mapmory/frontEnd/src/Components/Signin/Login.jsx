import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Checkbox, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize?client_id=fc231655583778a23c2eba6fcbd54a3f&redirect_uri=http://localhost:8080/mapmory/callbackKakao&response_type=code";

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className='Signin'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              label='Email Address'
              name='email'
              margin='normal'
              required
              fullWidth
              autoComplete='email'
              autoFocus
            ></TextField>
            <TextField
              label='Password'
              name='password'
              type='password'
              required
              fullWidth
              autoComplete='current-password'
            ></TextField>
            <Link onClick={handleLogin} style={{ cursor: "pointer" }}>
              <p>카카오로 바로 시작</p>
            </Link>

            <FormControlLabel
              control={<Checkbox value='remember' color='primary'></Checkbox>}
              label='날 기억해줘!'
            ></FormControlLabel>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: "#f7e600", color: "success.main" }}
            >
              SIGN IN
            </Button>
            {/* mt : margin-top, mb : margin-bottom */}
            <Grid container>
              <Grid item xs>
                <Link underline='none' component='button'>
                  비밀번호가 뭐더라
                </Link>
              </Grid>
              <Grid item>
                <Link
                  underline='none'
                  component='button'
                  onClick={() => {
                    navigate("/signup");
                  }}
                  to='/signup'
                >
                  계정 없음 가입해
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
