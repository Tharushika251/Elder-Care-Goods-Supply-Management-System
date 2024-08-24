import './App.css';
import Header from './components/Header';

import AddDonor from './components/AddDonor';
import AllDonors from './components/AllDonors';

import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Help from './components/Help';

import UpdateDonor from './components/UpdateDonor';
import DonorProfile from './components/DonorProfile';
import DonationManagerProfile from './components/DonationManagerProfile';
import MyProfile from './components/MyProfile';
import MyAccount from './components/MyAccount';

import DonorDashboard from './components/DonorDashboard';
import MyDonations from './components/MyDonations';
import AddGoodsDonation from './components/AddGoodsDonation';
import AddCashDonation from './components/AddCashDonation';
import AllDonations from './components/AllDonations';

import DonationManagerDashboard from './components/DonationManagerDashboard';
import AllDonationManagers from './components/AllDonationManagers';
import AddDonationManager from './components/AddDonationManager';
import UpdateDonationManager from './components/UpdateDonationManager';
import DonationDistribution from './components/DonationDistribution';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//---------------------------------------------------------------------------

function App() {

  return (
    <Router>
        <Header/>
        <Routes>
          <Route path="/add" element={<AddDonor />} />
          <Route path="/updateDonor/:id" element={<UpdateDonor />} />
          <Route path="/" element={<AllDonors />} />
          <Route path="/allDonors" element={<AllDonors />} />

          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/help" element={<Help />} />

          <Route path="/myDonations" element={<MyDonations />} />
          <Route path="/addGoodsDonation" element={<AddGoodsDonation />} />
          <Route path="/addCashDonation" element={<AddCashDonation />} />
          <Route path="/allDonations" element={<AllDonations />} />

          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/donorProfile/:id" element={<DonorProfile />} />
          <Route path="/donationManagerProfile/:id" element={<DonationManagerProfile />} />

          <Route path="/myProfile" element={<MyProfile />} />

          <Route path="/donorDashboard" element={<DonorDashboard />} />
       
          <Route path="/allDonationManagers" element={<AllDonationManagers />} />
          <Route path="/addManager" element={<AddDonationManager />} />
          <Route path="/updateDonationManager/:id" element={<UpdateDonationManager />} />
          <Route path="/" element={<AllDonationManagers />} />
          <Route path="/donationManagerDashboard" element={<DonationManagerDashboard />} />
          <Route path="/donationDistribution" element={<DonationDistribution />} />

        </Routes>
    </Router>
  );
}

export default App;
