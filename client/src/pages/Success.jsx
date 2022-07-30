import React from 'react'
import { useLocation } from 'react-router'

const Success = () => {
    const location = useLocation();

    

    console.log("ESTO ES:", location.search.slice(1).split("&"));
  

  return (
    <div>
      success
    </div>
  )
}

export default Success
