import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import CssBaseline from "@mui/material/CssBaseline";
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
import { useParams } from "react-router-dom";

export default function Signin({ setCurrentMemberId }) {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [item, setItem] = useState();
  const [button, setButton] = useState(true);
  let { id } = useParams();
  // console.log(id);

  const onEamilHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);

    let body = {
      email: email,
      password: password,
    };
    console.log(body);

    axios.post("/user/signin", body).then((res) => {
      console.log(res.data);
      console.log("member id : ", res.data.id);
      let member_id = res.data.id;
      // console.log("nickname : ", res.data.nickname);
      localStorage.clear();
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("nickname", res.data.nickname);
      setCurrentMemberId(res.data.id);
      id = member_id;
      navigate(`/${id}`);
    });
  };

  const goToMain = () => {
    navigate("/");
  };

  //유효성 검사
  const changeButton = () => {
    email.includes("@") && password.length >= 6
      ? setButton(false)
      : setButton(true);
  };

  return (
    <div className='Signin'>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
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
          <Box component='form' onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
            <TextField
              id='email'
              // label='Email Address'
              name='email'
              margin='normal'
              placeholder='email을 입력해주세요'
              required
              fullWidth
              autoComplete='email'
              autoFocus
              onChange={onEamilHandler}
              onKeyUp={changeButton}
            ></TextField>
            <TextField
              id='password'
              // label='Password'
              placeholder='password를 입력해주세요'
              name='password'
              type='password'
              margin='normal'
              required
              fullWidth
              autoComplete='current-password'
              onChange={onPasswordHandler}
              onKeyUp={changeButton}
            ></TextField>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary'></Checkbox>}
              label='날 기억해줘!'
            ></FormControlLabel>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={button}
              sx={{ mt: 3, mb: 2, bgcolor: "#f7e600", color: "success.main" }}
              // onClick={e => {
              //   if (myEmail == email) {
              //     if (myPassword == password) {
              //       e.stopPropagation();
              //       goToMain();
              //     }
              //   } else {
              //     alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
              //   }
              // }}
              // onClick={signIn}
            >
              SIGN IN
            </Button>
            {/* mt : margin-top, mb : margin-bottom */}
            <Grid container>
              <Grid item xs>
                {/* <Link underline='none' component='button'>
                  비밀번호가 뭐더라
                </Link> */}
              </Grid>
              <Grid item>
                <Link
                  underline='none'
                  component='button'
                  onClick={() => {
                    navigate("/signup");
                  }}
                  // to='/signup'
                  style={{
                    fontSize: "20px",
                  }}
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
