import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import mementoLogo from "../../images/Memento.png";
import giphy from "../../images/giphy.gif";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

export const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: actionType.LOGOUT});
        history.push('/auth');
        setUser(null)
    }

    //console.log(user);

    useEffect( () => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
    
            if (decodedToken.exp * 1000 < new Date().getTime()) logout(); //logout if token expired
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);


    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link tp='/' className={classes.brandContainer}>
                    <img src={mementoLogo} alt="icon" height="60px" />
                    <img className={classes.image} src={giphy} alt="memento" height="40" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            {console.log("Hi",user.result.given_name)}
                            
                            <Avatar className={classes.purple} alt={user.result.given_name} src={user.result.picture}>{user.result.given_name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.given_name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ): (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                    {/* {user ? (
                        <div className={classes.profile}>
                            {console.log(user.token.given_name)}
                            {console.log(user.result.name)}
                            {console.log(user.result.email)}
                            
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ): (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )} */}
                </Toolbar>
            </AppBar>
        </div>
    )
}
