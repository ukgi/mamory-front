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
import axios from "axios";

export default function Signup() {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [nickname, setNickname] = useState("");
  const [button, setButton] = useState(true);

  const onEamilHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
    // nickname(nickname);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);
    console.log("nickname", nickname);

    let body = {
      email: email,
      password: password,
      nickname: nickname,
    };
    console.log(body);

    axios.post("http://43.200.240.147:8000/user/signup", body).then((res) => {
      console.log(res.data);
      goToSignin();
    });
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  //유효성 검사
  const changeButton = () => {
    email.includes("@") && password.length >= 6 && nickname.length >= 4
      ? setButton(false)
      : setButton(true);
  };

  return (
    <div className='Signup'>
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
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={onSubmitHandler}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  name='email'
                  // label='Email Address'
                  placeholder='Email Address'
                  required
                  fullWidth
                  onChange={onEamilHandler}
                  onKeyUp={changeButton}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  type='password'
                  autoComplete='new-password'
                  name='password'
                  // label='Password'
                  placeholder='Password'
                  required
                  fullWidth
                  onChange={onPasswordHandler}
                  onKeyUp={changeButton}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='nickname'
                  name='nickname'
                  // label='Nickname'
                  placeholder='Nickname'
                  required
                  fullWidth
                  onChange={onNicknameHandler}
                  onKeyUp={changeButton}
                ></TextField>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      color='primary'
                    ></Checkbox>
                  }
                  label='혹시 이메일로 광고받을래?'
                ></FormControlLabel>
              </Grid> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={button}
                // onClick={goToMain}
                sx={{ mt: 3, mb: 2, bgcolor: "#f7e600", color: "success.main" }}
              >
                SIGN UP
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link
                    underline='none'
                    component='button'
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    이미 계정있으면 걍 로그인하삼
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
