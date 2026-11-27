import { create } from 'zustand'

/* 
유지보수 할 때, 상태값을 변경하는 action을 변경해야할 때
store만 고쳐주고, jsx는 고려 안해도 됨.
 => 그래서 상태 변경 로직은 다 Store에 만들어 놓는 것이 좋음

전역 상태 조회 밑 변경하는 Store 패턴
 - 컴포넌트에서는 꺼내만 쓰자
*/

const useCartStore = create((set) => ({
  // state
  // 장바구니 목록
  // [{id, name, price, qty}, ...]
  items: [],

  // action
  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((item) => item.id === product.id)
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }
      return { items: [...state.items, { ...product, qty: 1 }] }
    }),

  // 수량변경
  changeQty: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    })),

  // 삭제
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  // 전체 초기화
  clear: () => set({ items: [] }),
}))

export default useCartStore
