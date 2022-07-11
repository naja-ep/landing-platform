import { useEffect } from 'react';
import '../styles/globals.css'



//external user id 난수화
function randomDigitCharacterslength(lenth){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < lenth; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}





function MyApp({ Component, pageProps }) {

  
  
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        //appId: "516b2e1c-1f27-4c68-b639-b2d82617d697", //실서버
        appId: "ed203017-82b0-43f9-ac75-e39079746cb5", //개발서버
        safari_web_id: "",
        subdomainName: "당신의 서브도메인 여기에",
        welcomeNotification : {
          disable:true,
          title:"웰컴알림의 제목",
          message:"웰컴알림의 내용입니다. 구독해주셔서 감사합니다."
        },
        notifyButton: {
          enable: true,
          size: "medium", //버튼사이즈 : large, medium(기본값), small(활성화되었을 경우의 기본값)
          position: "bottom-right", //버튼 위치 : bottom-left, bottom-right(기본값)
        },
        allowLocalhostAsSecureOrigin: true,
      });


      OneSignal.getExternalUserId().then(function(externalUserId){
        //setExternalUserId(externalUserId);
        //SendPushHello(externalUserId);
        if(externalUserId == null || externalUserId == undefined ){
          console.log('없을때: '+externalUserId);
          const ramdonText = randomDigitCharacterslength(5);
          const newExternalUserId = ramdonText;
          console.log('new:' + newExternalUserId)
          OneSignal.setExternalUserId(newExternalUserId);
        } else {
          console.log('있을때: '+externalUserId);
        }
      });

    });

    return () => {
        window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount





  return <Component {...pageProps} />
}

export default MyApp
