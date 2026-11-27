import { useContext, useState } from 'react'
import { UserContext } from './contexts/UserContext'
import { ThemeContext } from './contexts/ThemeContext'

function Tag({ children }) {
  return (
    <span className="badge" style={{ marginLeft: 6 }}>
      {children}
    </span>
  )
}

// Props가 없음
function Layout() {
  return (
    <div className="box" style={{ borderStyle: 'dashed' }}>
      <b>Layout</b>
      <Tag>props 없음 ✨</Tag>
      <div style={{ marginTop: 12 }}>
        <Sidebar />
      </div>
    </div>
  )
}

// Props가 없음
function Sidebar() {
  return (
    <div className="box" style={{ borderStyle: 'dashed' }}>
      <b>Sidebar</b>
      <Tag>props 없음 ✨</Tag>
      <div style={{ marginTop: 12 }}>
        <UserMenu />
      </div>
    </div>
  )
}

function UserMenu() {
  // 3. 자식에서 꺼내서 씀
  const { user, logout } = useContext(UserContext)
  const theme = useContext(ThemeContext)
  const dark = theme === 'dark'

  return (
    <div
      className="box row"
      style={{
        justifyContent: 'space-between',
        background: dark ? '#23272f' : '#fff',
        color: dark ? '#fff' : undefined,
      }}
    >
      <span>
        <b>UserMenu</b> <span className="badge">useContext로 꺼냄</span> &nbsp; 👤 {user ? user.name : '로그인 필요'}
      </span>
      {user && (
        <button className="btn" onClick={logout}>
          로그아웃
        </button>
      )}
    </div>
  )
}

export default function ContextApi() {
  // 상태값들
  const [user, setUser] = useState({ name: '김리액트' })
  const [theme, setTheme] = useState('light')

  // Provider로 전달할 값
  // 함수도 같이 보낼 수 있음 (자식이 부모 상태를 변경할 수 있다.)
  const userValue = { user, logout: () => setUser(null) }

  return (
    <div className="stack">
      <div className="box row">
        <b>App (state 보유)</b>
        <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          테마: {theme}
        </button>
        {!user && (
          <button className="btn primary" onClick={() => setUser({ name: '김리액트' })}>
            로그인
          </button>
        )}
      </div>

      {/* Provider : 감싼 공간 안에서는 useContext로 값을 꺼낼 수 있음 */}
      <UserContext value={userValue}> {/* 통로한테 전달 */}
        <ThemeContext value={theme}>
          <Layout />
        </ThemeContext>
      </UserContext>

      <div className="note">
        <h3>07-5와 비교해 보세요</h3>
        <ul>
          <li>07-5: App → Layout → Sidebar → UserMenu 로 user, theme, onLogout 을 3번 전달</li>
          <li>09-2: Provider로 감싸기만 하면 UserMenu가 바로 꺼내 쓴다. 중간 컴포넌트는 아무것도 모른다</li>
          <li>Provider 바깥에서 useContext를 쓰면 createContext(기본값)의 기본값이 나온다</li>
        </ul>
      </div>
    </div>
  )
}
