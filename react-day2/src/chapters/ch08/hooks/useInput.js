import { useState } from 'react'

export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  // 이벤트 객체에서 값을 뽑아내 변경하는 함수
  function handleChange(e) {
    setValue(e.target.value)
  }

  // 초기화 하는 함수
  function reset() {
    setValue(initialValue)
  }

  return {
    value,
    setValue,
    reset,
    bind: { value, onChange: handleChange },
  }
}
