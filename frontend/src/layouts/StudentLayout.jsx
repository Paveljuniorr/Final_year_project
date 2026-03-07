import { Outlet } from "react-router-dom"
import StudentSidebar from "../components/StudentSidebar"

export default function StudentLayout(){

  return(

    <div className="dashboard-layout">

      <StudentSidebar/>

      <div className="dashboard-content">
        <Outlet/>
      </div>

    </div>

  )

}