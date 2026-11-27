import { createContext } from 'react'

/* 
useContext()
 - 중간 컴포넌트를 거치지 않고 멀리있는 자식 컴포넌트에 바로 보내는 통로

 1. context를 만드는 곳 (선언)
 2. 감싸기 : 값을 가진 부모 컴포넌트에 작성
 3. 꺼내기 : 자식 컴포넌트에 작성
*/
export const ThemeContext = createContext('light')
