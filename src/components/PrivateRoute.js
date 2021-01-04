import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { isSignedIn } from "../storage/storage";
import WrappedNormalLoginForm from "./login"
import history from "./history";
import { tsConstructorType } from "@babel/types";


var b =false;



const PrivateRoute = ({ component: Component, ...rest }) => (

 
 
  <Route
    {...rest}
   
    render={props => 
    //let a= true;
    
    (isSignedIn())==true ? (
      console.log("1"),
      <Redirect to={{ 
        
        pathname:"/",
        state:{from:props.location}
      }}
      />
     
      
    ): (
      console.log('2'),
      <Component {...props} />
        
    )
    /* isSignedIn().then(value => {
        if (!value) {
          
         a= false;
         
       
        
        }
       
        
      },
     
     
      );*/
     }
  />
);




export default PrivateRoute;
