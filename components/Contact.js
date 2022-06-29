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
              <input type="submit" value="문의하기" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;



