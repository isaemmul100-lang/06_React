import { create } from 'zustand'

/* 
create(함수) -> Hook을 return해줌
 - 함수가 돌려주는 객체 : state, action(값을 바꾸는 함수) return
 - set : setXXX같은 state를 바꾸는 함수
*/

const useUserStore = create((set) => ({ // store : 전역 상태들을 관리하는 공간
  // 상태값 (state를 하나 만들어야 함)
  user: { name: '김리액트' },

  // action - state를 바구는 함수도 같이 들어있음.
  login: () => set({ user: { name: '김리액트' } }),
  logout: () => set({ user: null }),
}))

export default useUserStore
