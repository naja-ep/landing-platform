import React, {useEffect, useState} from 'react';
import getUserData from "./api/GetUserData";


const Test = () => {
  //const [user, setUser] = useState("")
  const user = getUserData();
  // useEffect(()=>{
  //  console.log(getUserData())
  //   console.log("와아아아앙")
  // },[])
  
  console.log('$$$$'+user)

return(
  <>
   {user}
  </>
)
}


export default Test;