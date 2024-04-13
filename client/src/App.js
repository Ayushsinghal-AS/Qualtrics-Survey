import './App.css';
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import UserSurvey from './components/userSurvey';
import UserReport from './components/userReport';
import UserAIReport from './components/studio';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/survey" element={<UserSurvey />} />
          <Route path="/report" element={<UserReport />} />
          <Route path="/studio" element={<UserAIReport />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={2000} position="bottom-left" theme="colored" />
    </>
  );
}

export default App;
