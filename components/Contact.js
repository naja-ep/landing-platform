import react, { useState } from "react";
import baseApiUrl from "../utils/baseApiUrl";

const Contact = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [email, setEmail] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeContents = (e) => {
    setContents(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

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
        alert("정상적으로 문의가 등록되었습니다.");
        clearForm();
      } else {
        alert("정상적으로 문의가 등록되지 않았습니다. 다시 시도해주세요.");
      }
    });

  };

  const sendPush = () => {
  // 220630 발급 User Auth Key : YWI3YTM0MDAtNjBmZC00ZGQ1LWIwYzUtODY3NjUyNzJkNzc5
  
  //220630 발급 실서버 Rest api key : NGE1Zjk1MDAtZGUyYS00OGExLTg4YWItZGQ2NDJhZGFkOGFj
  // 220629 발급 개발서버 Rest api key : ZmE0MGNiYzUtYjljMC00YzFlLTgyZTAtYjhjNzUyYzMyYmJi
  
  //const appId = "ed203017-82b0-43f9-ac75-e39079746cb5" //개발서버
  //const appId = "516b2e1c-1f27-4c68-b639-b2d82617d697" //실서버

  const options = {
    method: 'POST',
    headers: {
      Accept: 'text/plain',
      Authorization: 'Basic NGE1Zjk1MDAtZGUyYS00OGExLTg4YWItZGQ2NDJhZGFkOGFj',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      //app_id: "ed203017-82b0-43f9-ac75-e39079746cb5", //개발서버
      app_id: "516b2e1c-1f27-4c68-b639-b2d82617d697", //실서버
      //included_segments: ['Subscribed Users'],
      contents: {en: 'Why So Serious cystal! :)', es: 'Spanish Message'},
      name: 'api로 만드는',
      //include_external_user_ids  : ['fede4cda-2ac2-48e3-b538-710ec1e3e4b2'] //개발서버
      include_external_user_ids  : ['8261d8c2-c1a2-43ad-9e4e-8efc3d539338'] //실서버
    })
  };

  fetch('https://onesignal.com/api/v1/notifications', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    console.log('알림전송완료')
  }

  return (
    <section id="contact">
      <div className="wrapper clearfix">
        <h2>문의</h2>
        <form name="form-contact" action="" onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="문의제목" id="name" onChange={changeName} value={name} />
            <textarea type="text" placeholder="내용" id="contents" onChange={changeContents} value={contents} />
            <input type="email" placeholder="답변 받을 이메일 주소" id="email" onChange={changeEmail} value={email} />
            <div>
              <input type="submit" value="문의하기" onClick={sendPush}/>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;



