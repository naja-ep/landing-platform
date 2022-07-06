import react, { useEffect, useState } from "react";
import baseApiUrl from "../utils/baseApiUrl";

const Contact = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [email, setEmail] = useState("");

  const changeName = (e) => { setName(e.target.value); };
  const changeContents = (e) => {  setContents(e.target.value);  };
  const changeEmail = (e) => {  setEmail(e.target.value);  };

  const clearForm = (e) => {
    setName("");
    setContents("");
    setEmail("");
  };


 


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, contents, email);

    const formData = {
      name,
      contents,
      email,
    };
    // console.log(formdata.name, formdata.contents, formdata.email);

    // strpi admin에 목록화하기
    fetch(`${baseApiUrl}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: `${formData.name}`,
          contents: `${formData.contents}`,
          email: `${formData.email}`,
        },
      }),
    }).then((response) => {
      //console.log(response);
      if (response.status === 200) {
        alert(response.status+"정상적으로 문의가 등록되었습니다.");
        //sendPush();
        clearForm();
      } else {
        alert(response.status+"에러. 정상적으로 문의가 등록되지 않았습니다. 다시 시도해주세요.");
      }
    });

  };


// async function sendPushToUser(){
//   await setRandomExternalUseId();
//   await SendPushHello();
// }



  const [externalUserId, setExternalUserId] = useState("");
  const setRandomExternalUseId = () => {
    OneSignal.getExternalUserId().then(function(externalUserId){
      console.log("서버에서 가져온 externalUserId: ", externalUserId);
      setExternalUserId(externalUserId);
      SendPushHello(externalUserId);
      console.log(externalUserId)
      
    });
  }


  async function SendPushHello(externalUserId){

    /*
      # User Auth Key(220630 발급)  : YWI3YTM0MDAtNjBmZC00ZGQ1LWIwYzUtODY3NjUyNzJkNzc5
      
      ## Authorization에 삽입
      # 개발서버 Rest api key(220629 발급) : ZmE0MGNiYzUtYjljMC00YzFlLTgyZTAtYjhjNzUyYzMyYmJi
      # 실서버 Rest api key(220630 발급) : NGE1Zjk1MDAtZGUyYS00OGExLTg4YWItZGQ2NDJhZGFkOGFj
      
      # 개발서버 Appid(앱이름:landing-platform) : ed203017-82b0-43f9-ac75-e39079746cb5
      # 실서버 Appid(앱이름:landing-platform-dev) : 516b2e1c-1f27-4c68-b639-b2d82617d697
    */
     //setRandomExternalUseId();
      const pushOptions = {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          //Authorization: 'Basic ZmE0MGNiYzUtYjljMC00YzFlLTgyZTAtYjhjNzUyYzMyYmJi', //개발서버
          Authorization: 'Basic NGE1Zjk1MDAtZGUyYS00OGExLTg4YWItZGQ2NDJhZGFkOGFj', //실서버
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //app_id: "ed203017-82b0-43f9-ac75-e39079746cb5", //개발서버
          app_id: "516b2e1c-1f27-4c68-b639-b2d82617d697", //실서버
          //included_segments: ['Subscribed Users'],
          contents: {ko:'(개발)문의해주셔서 감사합니다.빠른 시일내에 답변해드리겠습니다.😀', en: 'Welcome !! :)'},
          name: 'api로 만드는',
          include_external_user_ids : [`${externalUserId}`] //개발서버&실서버
          //include_external_user_ids : ['cf319f4b-aa2a-445f-b390-1e39bc354a69'] //개발서버-내꺼피씨크롬
          //include_external_user_ids : ['8261d8c2-c1a2-43ad-9e4e-8efc3d539338'] //실서버
        })
      };

      await fetch('https://onesignal.com/api/v1/notifications', pushOptions)
        .then(response => response.json())
        .then((response) => {
          console.log(response);
          console.log('알림전송완료');

          
        })
        .catch(err => {console.error(err);     });
        
  }


  /*
    const isSubscribe = () => {

      OneSignal.push(["getNotificationPermission", function(permission) {
        console.log("Site Notification Permission:", permission);
        // 사이트에서 알림을 허용하는지 여부: default(기본값), denied(차단됨), granted(허용함)
        if( permission === 'granted' ){
          console.log('알림을 허용함')
          sendPush();
        } else if ( permission === 'denied'){
          console.log('알림을 차단함');
        } else {
          console.log('알림 차단여부의 기본값')
          OneSignal.init({ 
            allowLocalhostAsSecureOrigin: true,
          })
        }

      }]);
    }
  */
  
  return (
    <>
    <section id="contact">
      <div className="wrapper clearfix">
        <h2>문의</h2>
        <form name="form-contact" action="" onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="문의제목" id="name" onChange={changeName} value={name} />
            <textarea type="text" placeholder="내용" id="contents" onChange={changeContents} value={contents} />
            <input type="email" placeholder="답변 받을 이메일 주소" id="email" onChange={changeEmail} value={email} />
            <span>
              <input type="submit" value="문의하기"/>
            </span>
          </div>
        </form>
      </div>  
    </section>
    <br/>
   
    <hr/>
 
    <br/>
    <div>
      <button onClick={setRandomExternalUseId}>해당 user에게 푸시 전송</button>
    </div>
    </>
  );
};
export default Contact;



