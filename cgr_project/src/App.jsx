import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signup from './Components/Signup&Login/Signup/Signup';
import Login from './Components/Signup&Login//Login/Login';
import DashboardAdmin from './Components/Admin/Dashboard_Admin/DashboardAdmin'
import WorkerMng_Admin from './Components/Admin/WorkerMng_Admin/WorkerMng_Admin';
import AddWorkerAdmin from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerAdmin';
import AddWorkerFormTwoMain from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerFormTwoAdmin/AddWorkerFormTwoMain';
import AddWorkerFormThreeMain from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerFormThreeAdmin/AddWorkerFormThreeMain';
import WorkerTaskMng from './Components/Worker/WorkerTaskMng/WorkerTaskMng';
import WorkerAttananceMng from './Components/Worker/WorkerAttananceMng/WorkerAttananceMng';
import FormDynamic from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/FormDynamic/FormDynamic';
import ViewWorker_Admin from './Components/Admin/WorkerMng_Admin/ViewWorker_Admin/ViewWorker_Admin';
import ExcelAddWorker_Admin from './Components/Admin/WorkerMng_Admin/ExcelAddWorker_Admin/ExcelAddWorker_Admin';
import ProjectMngDash from './Components/Admin/ProjectMng_Admin/ProjectMngDash/ProjectMngDash';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Signup />} ></Route> */}
          <Route path='/' element={<Login />} ></Route>

          {/* Admin start*/}


          {/* ------ Worker Mng Admin start------ */}

          <Route path='/dashboardadmin' element={<DashboardAdmin />} ></Route>
          <Route path='/workermngadmin' element={<WorkerMng_Admin />} ></Route>

          {/* Addworkeradmin */}
          <Route path='/addworkerformadmin' element={<AddWorkerAdmin />} ></Route>
          <Route path='/addworkerformtwomain' element={<AddWorkerFormTwoMain />} ></Route>
          <Route path='/addworkerformthreemain' element={<AddWorkerFormThreeMain />} ></Route>

          {/* excel addworker admin*/}
          <Route path='/exceladdworker' element={<ExcelAddWorker_Admin />} ></Route>

          {/* AddOptions Addworkeradmin */}
          <Route path='/formdynamic' element={<FormDynamic />} ></Route>

          {/* View particular worker data */}
          <Route path='/viewworkerdata' element={<ViewWorker_Admin />} ></Route>

          {/* ------ Worker Mng Admin end ------ */}

          {/* ------ Project Mng Admin start ------ */}

          {/* Add & View Project list */}
          <Route path='/viewprojectlist' element={<ProjectMngDash />} ></Route>

          {/* ------ Project Mng Admin end ------ */}

          {/* Admin end */}



          {/* worker */}

          {/* <Route path='/workerdashboard' element={<WorkerDashboard />} ></Route> */}
          {/* <Route path='/taskmngworker' element={<WorkerDashboard />} ></Route> */}
          {/* <Route path='/attanancemngworker' element={<WorkerDashboard />} ></Route> */}


          <Route path='/workertaskmng' element={<WorkerTaskMng />} ></Route>
          <Route path='/workerattmng' element={<WorkerAttananceMng />} ></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
