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


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication/>} />
        <Route path="announcements" element={<Announcements/>} />
        <Route path="employee" element={<EmployeeAcc/>} />
        <Route path="/*" element={
          <>
            <NavBar />
            <SideBar />
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path="home" element={<Home />} />
                <Route path="announcement" element={<HrAnnouncements />} />
                <Route path="applicant" element={<Applicant/>} />
                <Route path="employees" element={<Employees/>} />
                <Route path="away" element={<WhosAway/>} />
              </Route>
            </Routes>
          </>
        }

        />
        </Routes>
    </BrowserRouter>
  )
}

export default App
