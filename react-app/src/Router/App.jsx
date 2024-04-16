import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authentication } from '@/Views/Authentication'
import { Home } from '@/Views/Home'
import { PrivateRoutes } from "../Router/PrivateRoutes"


function App() {

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Authentication/>} />
        <Route element={<PrivateRoutes/>}>
            <Route path="home" element={<Home />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
