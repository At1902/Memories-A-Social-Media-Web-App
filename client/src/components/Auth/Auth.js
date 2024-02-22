import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId= "727016648817-3ib7fuceu06sajoua0kvsb44qu2mcf99.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;















// import React, { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
// import { signin, signup } from "../../actions/auth";
// import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// import Input from "./Input";
// import useStyles from "./styles";

// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const Auth = () => {
//   const classes = useStyles();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);

//     if (isSignup) {
//       dispatch(signup(formData, navigate));
//     } else {
//       dispatch(signin(formData, navigate));
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const switchMode = () => {
//     setIsSignup((prevIsSignup) => !prevIsSignup);
//     setShowPassword(false);
//   };

//   const googleSuccess = async (res) => {
//     const token = res?.credential;
//     const decoded = jwt_decode(res?.credential);
//     // console.log(result); // ? -> helps in not giving error if the obj does not exist
//     const { email, family_name, given_name, name, sub: googleId, picture } = decoded;
//     const result = { email, family_name, given_name, name, googleId, picture };

//     try {
//       dispatch({ type: "AUTH", data: { result, token } });
//       Naviagte.push("/posts");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     // global google
//     google.accounts.id.initialize({
//       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//       callback: googleSuccess,
//     });

//     google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
//       theme: "",
//       size: "large",
//     });
//   }, []);

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper className={classes.paper} elevation={3}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {isSignup && (
//               <>
//                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//                 <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//               </>
//             )}
//             <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
//             <Input
//               name="password"
//               label="Password"
//               handleChange={handleChange}
//               type={showPassword ? "text" : "password"}
//               handleShowPassword={handleShowPassword}
//             />
//             {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
//             {isSignup ? "Sign Up" : "Sign In"}
//           </Button>
//           <GoogleLogin
//             clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
//             render={(renderProps) => (
//               <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
//                 Google Sign In
//               </Button>
//             )}
//             onSuccess={googleSuccess}
//             onFailure={googleError}
//             cookiePolicy="single_host_origin"
//           />
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Auth;