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

export default function Signup() {
  let navigate = useNavigate();
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
          <Box conponent='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  label='First Name'
                  required
                  fullWidth
                  autoFocus
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='family-name'
                  name='lasttName'
                  label='Last Name'
                  required
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  name='email'
                  label='Email Address'
                  required
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='new-password'
                  name='password'
                  label='Password'
                  required
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      color='primary'
                    ></Checkbox>
                  }
                  label='혹시 이메일로 광고받을래?'
                ></FormControlLabel>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
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
