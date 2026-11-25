// 구조분해할당 하기 전
function MemberBefore(props) {
  return (
    <p>
      {props.name} · {props.team} · {props.level}
    </p>
  );
}

// props는 props를 사용하는 대신 주로 구조분해할당을 해서 사용함
// 구조분해할당 한 후
function MemberAfter({ name, team, level = "신입" }) {
  return (
    <p>
      {name} · {team} · {level}
    </p>
  );
}

// restparameter : 받은 Props 중에서 나머지 Props를 rest 모으기
function TextInput({ label, ...rest }) {
  console.log(rest)
  return (
    <label className="row">
      <span style={{ width: 60 }}>{label}</span>
      {/* rest(스프레드 문법) : input에 펼쳐서 전달 */}
      <input className="input" {...rest} />
    </label>
  );
}

export default function Destructuring() {
  const member = { name: "박민수", team: "디자인팀", level: "리드" };

  return (
    <div className="stack">
      <div className="box">
        <h3>구조 분해 전 / 후</h3>
        <MemberBefore name="김철수" team="개발팀" level="시니어" />
        <MemberAfter name="이영희" team="기획팀" /> {/* 값을 보낼 때 level를 안 보냈지만 defult값으로 신입이 출력됨 */}
        <MemberAfter {...member} />
      </div>

      <div className="box">
        <h3>...rest 로 나머지 props 전달</h3>
        <div className="stack">
          <TextInput label="이름" placeholder="홍길동" />
          <TextInput
            label="이메일"
            type="email"
            placeholder="hello@react.dev"
          />
        </div>
      </div>
    </div>
  );
}
