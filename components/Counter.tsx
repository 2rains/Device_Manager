import { useState } from "react";

interface counterProps {
  // 타입 지정
  title: String; // : 필수로 사용해야 함
  subTitle?: String; // ?: 사용해도 되고 안 해도 됨!
  practice?: String | Number; // |는 둘 중 아무거나 가능! 만약 오류로 'number'사용 안 되면 props.practice + "" 이렇게 문자열로 만들어줘야 함
  practice2?: Array<Number>;
}

function Counter(props: counterProps) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{props.title}</h1>
      <h2>카운터 : {count}</h2>
      <button onClick={() => setCount(count + 1)}> +1 </button>
      <button onClick={() => setCount(count - 1)}> -1 </button>
    </>
  );
}

export default Counter;
