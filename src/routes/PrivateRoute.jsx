import React, { useContext } from 'react';
import { AuthenticationData } from '../inforProviders/AuthInfoProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user,loading} = useContext(AuthenticationData);
    let location = useLocation();

    // handling the loading proccess before data coming
    if(loading){

          return <h2 style={{height:'calc(100vh - 60.87px)',textShadow:'2px 2px 3px black'}} className='text-5xl font-bold w-full flex justify-center items-center text-[#d07f05]'>Loading data....</h2>
    }

     if(!user){
           
          return  <Navigate to="/login" state={{ from: location }} replace />;
     }

    return children;
};

export default PrivateRoute;