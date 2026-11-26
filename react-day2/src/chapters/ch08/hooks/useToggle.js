import { useState } from 'react'

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue) // 상태값

  function toggle() {
    setValue((prev) => !prev)
  }

  return [value, toggle, setValue]
}
