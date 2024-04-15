import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authentication } from '@/Views/Authentication'

function App() {

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Authentication/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
