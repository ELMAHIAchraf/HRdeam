import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Authentication } from '@/Views/Authentication'
import { Home } from '@/Views/Home'
import { PrivateRoutes } from "../Router/PrivateRoutes"
import { NavBar } from '@/components/ui/NavBar'
import { SideBar } from '@/components/ui/SideBar'
import { Applicant } from '@/Views/Applicant'
import { Employees } from '@/Views/Employees'
import { WhosAway } from '@/Views/WhosAway'
import { Announcements } from '@/Views/Announcements'
import { HrAnnouncements } from '@/Views/HrAnnouncements'
import { EmployeeAcc } from '@/Views/EmployeeAcc'
import { Admin } from '@/Views/Admin'
// import { NotFound } from '@/Views/NotFound'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication/>} />
        <Route path="announcements" element={<Announcements/>} />
        <Route path="employee" element={<PrivateRoutes role="employee"><EmployeeAcc /></PrivateRoutes>}  />
        <Route path="/*" element={
          <>
            {window.location.pathname !== "*" && (
              <>
                <NavBar />
                <SideBar />
              </>
            )}
            <Routes>
              <Route path="home" element={<PrivateRoutes role="hr"><Home /></PrivateRoutes>}/>
              <Route path="announcement" element={<PrivateRoutes role="hr"><HrAnnouncements /></PrivateRoutes>}/>
              <Route path="applicant" element={<PrivateRoutes role="hr"><Applicant /></PrivateRoutes>}/>
              <Route path="employees" element={<PrivateRoutes role="hr"><Employees /></PrivateRoutes>}/>
              <Route path="away" element={<PrivateRoutes role="hr"><WhosAway /></PrivateRoutes>}/>
              <Route path="admin" element={<PrivateRoutes role="hr"><Admin /></PrivateRoutes>}/>
              {/* <Route path="*" element={<NotFound/>} />   */}
            </Routes>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App