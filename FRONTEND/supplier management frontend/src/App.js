import React from 'react';
import './App.css';
import { BrowserRouter, Route ,Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Inventorymessages from './pages/Inventorymessages';
import Placeorder from './pages/Placeorder';
import Supplierdetails from './pages/Supplierdetails';
import Report from './pages/Report';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/"element={<Inventorymessages/>}/>
          <Route path="/inventorymessages"element={<Inventorymessages/>}/>
          <Route path="/placeorder"element={<Placeorder/>}/>
          <Route path="/supplierdetails"element={<Supplierdetails/>}/>
          <Route path='/report'element={<Report/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
