import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import {saveCredentials} from "../../redux-store/actions/actions";
import {FormattedMessage} from 'react-intl'


export default function Login({changeLocale}) {

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCredential = useSelector((state) => state.saveCredentialReducer);  

  useEffect(() => {
    if(userCredential.email && userCredential.password){
      navigate('/dashboard');
    }
  },[userCredential, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const userInfo = {
      email: data.get("email"),
      password: data.get("password"),
    }
    dispatch(saveCredentials(userInfo));
    navigate('/dashboard');
  };

  

  function ValidateEmail(mail) {
    const emailPatter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailPatter.test(mail)) {
      return true;
    }
    return false;
  }

  function CheckPassword(inputtxt) {
    var passw = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/
    if (inputtxt.match(passw)) {
      return true;
    } else {
      return false;
    }
  }
  


  const handleEmail = (event) => {
    setEmail(event.target.value)
    const isValid = ValidateEmail(event.target.value)
    if(isValid){
      setValidEmail(true)
    }else {
      setValidEmail(false)
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value)
    const isValid = CheckPassword(event.target.value)
    if(isValid){
      setValidPassword(true)
    }else {
      setValidPassword(false)
    }
  }

  const handleENlang = () => {
    changeLocale('en')
  }

  const handleARlang = () => {
    changeLocale('ar')
  }

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5">
        <FormattedMessage
          id="signIn"
        />
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={<FormattedMessage
              id="email"/>}
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={<FormattedMessage
              id="password"/>}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
            helperText={<FormattedMessage
              id="validPassword"/>}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validEmail || !validPassword}
          >
            <FormattedMessage
          id="signIn"
        />
          </Button>
        </Box>
        <Stack spacing={2} direction="row">
      <Button variant="text" onClick={handleENlang}>English</Button>
      <Button variant="text" onClick={handleARlang}>Arabic</Button>
    </Stack>
      </Box>
    </Container>
  );
}
