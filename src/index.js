import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fontsource/inter";
import { AuthProvider } from './Components/context/AuthContext'; // ✅ Corrected import path
import { DarkModeProvider } from "./Components/context/DarkModeContext"; // ✅ Corrected import path 
import { Toaster } from "react-hot-toast";
import HomePage from './Components/Pages/HomePage';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Events from './Components/Pages/Events';
import CreateEvents from './Components/Pages/CreateEvents';
import College from './Components/Pages/College';
import Dashboard from './Components/Pages/Dashboard';
import AllEvents from './Components/Pages/AllEvents';
import CollegeEvents from './Components/Pages/CollegeEvents';
import Registration from './Components/Pages/Registration';
import PageNotFound from './Components/Pages/PageNotFound';
import reportWebVitals from './reportWebVitals';
import ManageEvents from "./Components/Pages/ManageEvents";
import ForgotPassword from './Components/Pages/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword';
import EventDetails from "./Components/Pages/EventDetails"; // ✅ Corrected import path
import PaymentPage from "./Components/Pages/PaymentPage";
import BookingSuccess from "./Components/Pages/BookingSuccess"; // ✅ Corrected import path
import DashboardTab from './Components/Pages/DashboardTab';
import EditEvent from "./Components/Pages/EditEvent";
import ManageVisitors from "./Components/Pages/ManageVisitors";
import AdminLogin from "./Components/Pages/AdminLogin"; // ✅ Corrected path
import ProtectedRoute from "./Components/Pages/ProtectedRoute"; // ✅ Corrected path
import AdminRegister from "./Components/Pages/AdminRegister"; // ✅ Corrected path
import EventShop from "./Components/Pages/EventShop"; // ✅ Corrected path
import MyOrders from "./Components/Pages/MyOrders";
import VisitorsSubscribers from './Components/Pages/VisitorsSubscribers';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/CreateEvents" element={<CreateEvents />} />
            <Route path="/College" element={<College />} />
            <Route path="/AllEvents" element={<AllEvents />} />
            <Route path="/CollegeEvents" element={<CollegeEvents />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/dasboard-tab" element={<DashboardTab />} />
            <Route path="/ManageEvents" element={<ManageEvents />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/manage-visitors" element={<ManageVisitors />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/shop" element={<EventShop />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/visitors-subscribers" element={<VisitorsSubscribers />} /> 
            <Route path="/event/:id" element={<EventDetails />} />

            <Route element={<ProtectedRoute />}>
             
            

            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

reportWebVitals();
