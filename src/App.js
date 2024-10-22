import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './App.css';
import NameForm from './form';
import InstitutionForm from './graduationInstitutionform';
import GraduationYearForm from './graduationYearform';
import OutstandingPaymentForm from './outstandingpaymentform';
import InductionPaymentForm from './inductionpaymentform';
import Summary from "./summary";
function App() {
  const location = useLocation();
  return (
    <div className="App">

      <Link className='links' to={`/`}>
        <header className="App-header">
          <img src='/CITN-Logo.png' className="App-logo" alt="logo" />
        </header>
      </Link>

      <div className='subtitleDiv'>
        <h2>
          CITN
        </h2>
        <h3> Screening Process</h3>
      </div>

      <div className='formDiv'>
        <AnimatePresence mode="wait">

          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<NameForm />} />
            <Route path="/institution" element={<InstitutionForm />} />
            <Route path="/gradutionYear" element={<GraduationYearForm />} />
            <Route path="/outstandingPayment" element={<OutstandingPaymentForm />} />
            <Route path="/inductionPayment" element={<InductionPaymentForm />} />
            <Route path="/summary" element={<Summary />} />

          </Routes>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
