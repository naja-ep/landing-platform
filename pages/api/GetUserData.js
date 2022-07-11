import React, {useEffect, useState} from 'react';

export default function GetUserData(){
  const [exterUserId,setExterUserId] = useState("");
  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Basic ZmE0MGNiYzUtYjljMC00YzFlLTgyZTAtYjhjNzUyYzMyYmJi'
    }
  };
  useEffect(()=>{

    fetch('https://onesignal.com/api/v1/players/390b7468-c97d-4ab4-9f13-0fccb7373658?app_id=ed203017-82b0-43f9-ac75-e39079746cb5', options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      console.log('유저아이디'+response.external_user_id)
      setExterUserId(response.external_user_id);
    })
    .catch(err => console.error(err));

    
  },[])
  return exterUserId
}

