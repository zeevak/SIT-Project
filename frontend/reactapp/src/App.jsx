import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import UserLogin from "./pages/UserLogin";
import UserRegisterationForm from "./pages/UserRegisterationForm";
import VehicleRegistration from "./pages/VehicleRegistration";
import DisplayVehicleDetails from "./pages/DisplayVehicleDetails";
import ForgotPassword from "./pages/Forgotpassword";
import StationRegistration from "./pages/StationRegistration";
import DisplayStationDetails from "./pages/DisplayStationDetails";
import Contact from "./pages/Contact";
import AdminDashboard from "./AdminPages/AdminDashboard";
import ManageReports from "./AdminPages/ManageReports";
import AdminHome from "./AdminPages/AdminHome";
import ViewStations from "./AdminPages/ViewStations";
import UpdateStationFuel from "./AdminPages/UpdateStationFuel";
import UpdateStation from "./AdminPages/UpdateStation";
import ViewRegisteredVehicle from "./AdminPages/ViewRegisteredVehicle";
import ViewProfile from "./AdminPages/ViewProfile";
import Notification from "./AdminPages/Notification";
import ProfilePage from "./pages/Profile";
import UpdateSelectedStationFuel from "./AdminPages/UpdateSelectedStationFuel";
import ManageUser from "./AdminPages/ManageUser";
import FuelManage from "./AdminPages/FuelManage";
import Service from "./pages/Service";
import AvailableVehicles from "./AdminPages/AvailableVehicles";
import Authentication from "./apiservice/Authentication";
import TermsAndConditions from "./pages/TermsAndConditions";
import Footer from "./components/Footer";
import UserDashboard from "./pages/UserDashboard";
import UserHome from "./pages/UserHome";
import StationDashboard from "./pages/StationDashboard";
import StationHome from "./pages/StationHome";
import StationOwnerProfile from "./pages/StationOwnerProfile";
import VehicleOwnerProfile from "./pages/VehicleOwnerProfile";
import StationTransaction from "./pages/StationTransaction";
import VehicleTransaction from "./pages/VehicleTransaction";
 
function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/stationOwner");

  return (
    <div className="fuelPass">
      {!isAdminRoute && <Navbar />}

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegisterationForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />

          {Authentication.isVehicleOwner && (
            <Route>
              <Route
                path="/vehicleRegister"
                element={<VehicleRegistration />}
              />
              <Route
                path="/vehicleHistory"
                element={<DisplayVehicleDetails />}
              />
            </Route>
          )}
          {Authentication.isFuelStationOwner && (
            <Route>
              <Route
                path="/stationRegister"
                element={<StationRegistration />}
              />
              <Route
                path="/StationHistory"
                element={<DisplayStationDetails />}
              />
            </Route>
          )}
          {Authentication.isAdmin ||
            Authentication.isFuelStationOwner ||
            (Authentication.isVehicleOwner && (
              <Route path="/profile" element={<ProfilePage />} />
            ))}

          {/* Admin routes */}
          {Authentication.isAdmin && (
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />

              <Route path="reports" element={<ManageReports />} />
              <Route path="viewStations" element={<ViewStations />} />
              <Route path="updateStationFuel" element={<UpdateStationFuel />} />
              <Route path="updateStationFuel" element={<UpdateStationFuel />} />
              <Route path="updateStation" element={<UpdateStation />} />
              <Route
                path="registeredVehicles"
                element={<ViewRegisteredVehicle />}
              />
              <Route path="AvailableVehicles" element={<AvailableVehicles />} />
              <Route path="manageuser" element={<ManageUser />} />
              <Route path="profile" element={<ViewProfile />} />
              <Route path="fuelTypes" element={<FuelManage />} />
              <Route path="notification" element={<Notification />} />
              <Route
                path="updateSelectedStationFuel"
                element={<UpdateSelectedStationFuel />}
              />
            </Route>
          )}

          <Route path="/users" element={<UserDashboard />}>
            <Route index element={<UserHome />} />
            <Route path="vehicleRegister" element={<VehicleRegistration />} />
            <Route path="vehicleHistory" element={<DisplayVehicleDetails />} />
            <Route path="vprofile" element={<VehicleOwnerProfile />} />
            <Route path="vtransaction" element={<VehicleTransaction />} />


          </Route>

          <Route path="/stationOwner" element={<StationDashboard />}>
            <Route index element={<StationHome />} />
            <Route path="stationRegister" element={<StationRegistration />} />
            <Route path="StationHistory" element={<DisplayStationDetails />} />
            <Route path="profile" element={<StationOwnerProfile />} />
            <Route path="stransaction" element={<StationTransaction />} />


            
          </Route>
        </Routes>
      </div>

      {/* {isAdminRoute && <AdminNavbar />} */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
