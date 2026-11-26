import { useEffect, useState } from "react";

export default function Playground() {
  const [text, setText] = useState("불러오는 중...");

  // 화면이 그려지면 동작
  // 의존성이 ([]) 이면 화면이 처음나타날 때 한 번만 동작
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => setText(JSON.stringify(data, null, 2)));
  }, []);

  return (
    <div>
      <div>
        <h3>여기서부터 시작!</h3>
        <p>src/playground/Playground.jsx 를 수정해 보세요.</p>
      </div>
      <div>
        <h3>JSONPlaceHolder 응답</h3>
        <pre>{text}</pre>
      </div>
    </div>
  );
}
