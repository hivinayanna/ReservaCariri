import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export type Page = 'landing' | 'login' | 'dashboard'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  return (
    <>
      {page === 'landing' && (
        <Landing
          onLogin={() => setPage('login')}
          onRestaurant={() => setPage('login')}
        />
      )}
      {page === 'login' && (
        <Login
          onBack={() => setPage('landing')}
          onLogin={() => setPage('dashboard')}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard onLogout={() => setPage('landing')} />
      )}
    </>
  )
}
