import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthorizationContext } from '../Contexts/Authorization';

const PrivateComponent = ({children }) => {
  
    const {token} = useContext(AuthorizationContext);

  if(token)
  {
    return children 
  }
  else
  {
    return <Navigate to="/login" />
  }
}

export default PrivateComponent
