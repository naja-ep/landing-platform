import { useEffect } from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
         appId: "516b2e1c-1f27-4c68-b639-b2d82617d697", //실서버
        //appId: "ed203017-82b0-43f9-ac75-e39079746cb5", //개발서버
        safari_web_id: "",
        subdomainName: "당신의 서브도메인 여기에",
        welcomeNotification : {
          disable:true,
          title:"웰컴알림의 제목",
          message:"웰컴알림의 내용입니다. 구독해주셔서 감사합니다."
        },
        notifyButton: {
          enable: true,
          size: "medium", //large, medium, small
          position: "bottom-right", //bottom-left, bottom-right(default)
        },
        allowLocalhostAsSecureOrigin: true,
      })
      OneSignal.push(["getNotificationPermission", function(permission) {
        console.log("Site Notification Permission:", permission);
        // (Output) Site Notification Permission: default
      }]);
      OneSignal.getUserId().then(function(userId){ //userId 가져오기
        if(userId == null){
          console.log('userId가 없습니다.')
        } else {
          console.log("userId(=playerId): ",userId)
          const externalUserId = userId;
          console.log("userId로 가져온 externalUserId: ",externalUserId);
          OneSignal.setExternalUserId(externalUserId);
          OneSignal.getExternalUserId().then(function(externalUserId){
            console.log("서버에서 가져온 externalUserId: ", externalUserId);
          });
        }
      })


    });

    return () => {
        window.OneSignal = undefined;
    };
}, []); // <-- run this effect once on mount

  return <Component {...pageProps} />
}

export default MyApp
