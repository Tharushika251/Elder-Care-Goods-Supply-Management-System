
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import AddStaff from "./components/AddStaff";

import AllStaff from "./components/AllStaff";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Salary from './components/Salary';
import Profile from './components/Profile';
import UpdateStaff from './components/UpdateStaff';
import AddSalary from './components/AddSalary';
import Start from './components/Start';
import StaffLogin from './components/StaffLogin';
import StaffDetails from './components/StaffDetails';


function App() {
  return (
    <Router>
      <div>
        
        
        <Routes>
          <Route path="/start"  exact element={<Start />} />
          <Route path="/adminlogin"  exact element={<Login />} />
          <Route path="/staff_login"  exact element={<StaffLogin />} />
          <Route path="/dashboard"  exact element={<Dashboard/>}>
            <Route path=""  exact element={<Home />} />
            <Route path="/dashboard/all"  exact element={<AllStaff />} />
            <Route path="/dashboard/salary"  exact element={<Salary />} />
            <Route path="/dashboard/profile"  exact element={<Profile />} />
            <Route path="/dashboard/add" exact element={<AddStaff />} />
            <Route path="/dashboard/update/:id" exact element={<UpdateStaff />} />
            <Route path="/dashboard/addsal" exact element={<AddSalary />} />
            
          </Route>
          <Route path="/staff_login/staff_detail/:id" exact element={<StaffDetails />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

