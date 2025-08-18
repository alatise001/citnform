import { Route, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './App.css';

import NameForm from './form';
import Summary from "./summary";
import BooleanForm from "./booleanForm";
import DropdownForm from "./dropdownForm ";
import InductionForm from "./inductionform";
import CheckBoxForm from "./checkboxForm";
import Redirection from "./redirection";

function App() {
  const location = useLocation();
  return (
    <div className="app">

      <Link className='links' to={`/`}>
        <header className="app-header">
          <img src={`${process.env.PUBLIC_URL}/CITN-Logo.png`} className="app-logo" alt="logo" />
        </header>
      </Link>

      <div className='subtitleDiv'>
        <h2>
          Welcome to CITN Direct Membership Eligiblity Form
        </h2>
        {/* <h3>  Screening Process</h3> */}
      </div>

      <div className='formDiv'>
        <AnimatePresence mode="wait">

          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<NameForm />} />
            <Route path="/certification/:slug" element={<DropdownForm />} />
            <Route path="/:slug" element={<BooleanForm />} />
            <Route path="/induction_year" element={<InductionForm />} />
            <Route path="/attestation" element={<CheckBoxForm />} />
            <Route path="/summary" element={<Summary />} />

            <Route path="/redirection" element={<Redirection />} />

          </Routes>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
