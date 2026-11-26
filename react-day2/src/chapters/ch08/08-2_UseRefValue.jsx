import { useEffect, useRef, useState } from 'react'

function Compare() {
  const [stateCount, setStateCount] = useState(0)
  /* 
  useRef : 컴포넌트에 붙어있는 다시 그려도 사라지지 않는 공간
   - state는 값이 변경되면 화면을 다시 그렸지만, useRef는 화면을 다시 그리지 않음 (별개)

  일반 변수  : 리렌더링 하면 초기화      / 값을 바꾸면 화면변화 X
  useRef    : 리렌더링 하면 값을 유지   / 값을 바꾸면 화면변화 X // 타이머 id, 이전 값, 외부 객체를 보과할 때 사용
  useState  : 리렌더링 하면 값을 유지   / 값을 바꾸면 화면변화 O
  */
  const refCount = useRef(0) // 일반 변수에 Ref를 붙여주는 형태 -> 값을 꺼낼 때 = 변수명.currunt
  let varCount = 0
  const [message, setMessage] = useState('') // 리렌더링이 발생하는 이유

  return (
    <div className="box stack">
      <h3>① 일반 변수 vs useRef vs useState</h3>
      <div className="row">
        <button
          className="btn"
          onClick={() => {
            varCount += 1
            setMessage(`일반 변수 = ${varCount}`)
          }}
        >
          변수 +1
        </button>
        <button
          className="btn"
          onClick={() => {
            refCount.current += 1 // 변수명.currunt : 현재의 값을 꺼낸다
            setMessage(`ref.current = ${refCount.current} (화면은 그대로였지만 값은 기억하고 있다)`)
          }}
        >
          ref +1
        </button>
        <button className="btn primary" onClick={() => setStateCount(stateCount + 1)}>
          state +1 (리렌더링)
        </button>
      </div>
      <p>
        state: <b>{stateCount}</b>
      </p>
      <p className="hint">{message || '버튼을 눌러 보세요. 변수는 매번 1, ref는 계속 증가한다.'}</p>
    </div>
  )
}

function Stopwatch() {
  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)
  const intervalRef = useRef(null) // 화면에 안 보이지만 기억해야 스탑워치를 조작 가능함. -> state로도 가능은 한데 재시작할 때마다 컴포넌트 다시 만드는게 메모리를 많이 사용함

  function handleStart() {
    clearInterval(intervalRef.current)
    setStartTime(Date.now())
    setNow(Date.now())
    intervalRef.current = setInterval(() => setNow(Date.now()), 10)
  }

  function handleStop() {
    clearInterval(intervalRef.current) // 스탑워치의 id가 필요
    intervalRef.current = null
  }

  // 컴포넌트가 사라질 때 타이머 없애기
  useEffect(() => () => clearInterval(intervalRef.current), [])

  const seconds = startTime && now ? (now - startTime) / 1000 : 0

  return (
    <div className="box stack">
      <h3>② 스톱워치 — setInterval id를 useRef에 보관</h3>
      <p className="big-number">{seconds.toFixed(2)}초</p>
      <div className="row">
        <button className="btn primary" onClick={handleStart}>
          시작
        </button>
        <button className="btn" onClick={handleStop}>
          정지
        </button>
      </div>
      <p className="hint">
        id를 state에 두면 쓸데없는 리렌더링이, 일반 변수에 두면 다음 렌더링 때 잃어버린다 → ref가 정답
      </p>
    </div>
  )
}

export default function UseRefValue() {
  return (
    <div className="stack">
      <Compare />
      <Stopwatch />
    </div>
  )
}
