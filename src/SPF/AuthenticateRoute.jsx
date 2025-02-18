import React,{Component} from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from './api/AuthenticationService';

class AuthenticateRoute extends Component{
    render(){
        
        if(AuthenticationService.isUserLoggedIn()){
            return {...this.props.children}
        }else{
            return <Navigate to="/welcome" /> 
        }
    }
}

export default AuthenticateRoute