import { useEffect } from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  const externalUserId = '12345567'; //값 수정 필요

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
         appId: "516b2e1c-1f27-4c68-b639-b2d82617d697", //실서버
        //appId: "ed203017-82b0-43f9-ac75-e39079746cb5", //개발서버
        safari_web_id: "",
        subdomainName: "당신의 서브도메인 여기에",
        text:"텍스트입니다~",
        welcomeNotification : {
          disable:true,
          title:"웰컴알림의 제목",
          message:"웰컴알림의 내용입니다. 구독해주셔서 감사합니다."
        },
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      })
      OneSignal.setExternalUserId(externalUserId);
      OneSignal.getExternalUserId().then(function(externalUserId){
        console.log("externalUserId: ", externalUserId);
      });

    });

    return () => {
        window.OneSignal = undefined;
    };
}, []); // <-- run this effect once on mount

  return <Component {...pageProps} />
}

export default MyApp
