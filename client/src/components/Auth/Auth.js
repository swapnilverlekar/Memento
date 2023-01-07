import React , { useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login'; //Deprecated

import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';

//import Icon from './icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useStyles from './styles'
import Input from './Input';
//import { AUTH } from '../../constants/actionTypes';
import {signin, signup} from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export const Auth = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent refresh
        //console.log(formData);
        if(isSignup){
            dispatch(signup(formData, history)); //pass formData to put it in DB, pass history to navigate somewhere
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup );
        setShowPassword(false)
    }


    /**Google Login */
    const googleSuccess = async (res) => {
        const token = res?.credential;
        const result = jwt_decode(res.credential);
        console.log("Hi",result)

        try{
            dispatch({ type: 'AUTH', data: {token,result}});
            history.push('/');

        }catch(error){
            console.log(error);
        }

        //console.log(res);
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later.");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant='h5'>{isSignup ? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                                    
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                        
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up':'Sign In'}
                    </Button>

                    {/* <GoogleOAuthProvider 
                        clientId='58957300193-n86uslt8bo6q2en5fhncjomoldr16qac.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained"
                                >
                                   Google Sign In 
                                </Button>
                        )}
                        cookiePolicy="single_host_origin"
                    /> */}

                    {/* <GoogleLogin 
                        onSuccess={(response) => console.log(response)}
                        onError={(error) => console.log(error)}
                    
                    /> */}

                    <GoogleLogin fullWidth
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In':"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
