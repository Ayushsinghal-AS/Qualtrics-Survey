import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestAPI } from "../API/index";
import { PROFILE } from "../API/url";
import Cookies from 'js-cookie';



function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);


    const handleEmailChange = (e) => {
        const {value} = e.target;
        setEmail(value);
        setErrorEmail("");
    }

    const handlePasswordChange = (e) => {
        const {value} = e.target;
        setPassword(value);
        setErrorPassword("");
    }

    const validate = () => {
        if(!regex.test(email)) {
            setErrorEmail(true);
            return;
        }
        if(!password) {
            setErrorPassword(true);
            return;
        }
        else{
            return true
        }
    }

    const handleSubmit = async() => {
        try {
            if(validate()){
                const data = await requestAPI.postAPI(`${PROFILE.POST}`, {email, password});
                Cookies.set('UUID', data.data.id);
                Cookies.set('email', data.data.email);
                    if(data.success === true){
                        toast.success("Login Successfully", {hideProgressBar: true, closeOnClick: true});
                        navigate('/')
                    }else{
                        toast.error("Login Failed", {hideProgressBar: true, closeOnClick: true});
                    }
            }else {
                navigate('/login')
            }
            
        } catch (error) {
            toast.error("Login Failed", {hideProgressBar: true, closeOnClick: true});
            console.log(error)   
        }
    }


  return (
    <>
        <div style={{ height: "80vh" }} className='d-flex justify-content-center align-items-center'>
            <Container className='shadow-lg' component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" className='pe-2'>
                        Login Here
                    </Typography>
                    <Box>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            error={errorEmail}
                            helperText={errorEmail ? "invalid Email Address" : ""}
                            placeholder='Enter your Email'
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            error={errorPassword}
                            helperText={errorPassword ? "invalid Password" : ""}
                            placeholder='Enter your Password'
                        />
                        <Box>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => handleSubmit()}
                        >
                            Login
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    </>
  )
}

export default Login