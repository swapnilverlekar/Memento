import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
    return(
        <GoogleOAuthProvider 
            clientId='58957300193-n86uslt8bo6q2en5fhncjomoldr16qac.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;