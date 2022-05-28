import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { stateSite , webConfig } from '../GlobalConfig';
import cookie from 'react-cookies';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const tokenResult = cookie.load(webConfig.cookieNameAuth);
    //console.log(tokenResult);
    
    return (

        <Route {...rest} render={props => {
            //console.log(rest);
            return(
                tokenResult
                ? <Component {...props} ></Component>
                : <Redirect to={{ pathname: '/login/empleador', state: { from: props.location } }} ></Redirect>
            )
           
        }} ></Route>
    )

    
}
