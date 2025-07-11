import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DistrictJournalists from './pages/DistrictJournalists';
import JournalistVideos from './pages/JournalistVideos';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import Upload from "./pages/Upload";
import VideoDeletionLogs from "./pages/VideoDeletionLogs";
import AllRoute from "./pages/AllRoute";
import MyVideos from "./pages/MyVideos";
import AdminPanel from "./pages/AdminPanel";
import StatsDashboard from "./pages/StatsDashboard";
import ExportVideos from "./pages/ExportVideos";
import DistrictManager from "./pages/DistrictManager";
import Register from "./pages/Register";
import DistrictList from "./components/DistrictList";
import VideoList from './components/VideoList';

function App() {
  return (

    <Routes>
  <Route path="/dashboard" element={
    
      <>
       <PrivateRoute roles={["editor", "admin","journalist"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <Dashboard />
       
        </div>
        <Footer/>
      </PrivateRoute>
      </>
    } />
  <Route path="/login" element={<><div className='wraperFooter'><Navbar/> <Login /></div><Footer/></>} />

  {/* Journalist-only route */}
  <Route
    path="/upload"
    element={
      <PrivateRoute roles={["journalist"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <Upload />
        </div>
        <Footer/>
      </PrivateRoute>
    }
  />

  {/* Editor-only routes */}
  <Route
    path="/district/:districtId"
    element={
      <PrivateRoute roles={["editor", "admin"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <DistrictJournalists />
        </div>
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
      path="/journalist/:userId/videos"
      element={
        <PrivateRoute roles={["editor", "admin"]}>
          <div className='wraperFooter'>
          <Navbar/>
          <JournalistVideos />
          </div>
          <Footer/>
        </PrivateRoute>
      }
    />
    <Route
    path="/my-videos"
    element={
      <PrivateRoute roles={["journalist"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <MyVideos />
        </div>
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
    path="/admin"
    element={
      <PrivateRoute roles={["admin"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <AdminPanel />
        </div>
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
    path="/stats"
    element={
      <PrivateRoute roles={["admin"]}>
        <div className='wraperFooter'>
        <Navbar/>
        <StatsDashboard />
        </div>
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
      path="/export"
      element={
        <PrivateRoute roles={["admin"]}>
          <div className='wraperFooter'>
          <Navbar/>
          <ExportVideos />
          </div>
          <Footer/>
        </PrivateRoute>
      }
    />
      {/* <Route
      path="/districtsmanage"
      element={
        <PrivateRoute roles={["admin"]}>
          <Navbar/>
          <DistrictManager />
          <Footer/>
        </PrivateRoute>
      }
    /> */}
      <Route
      path="/register"
      element={
        <>
        <div className='wraperFooter'>
          <Navbar/>
          <Register />
          </div>
          <Footer/>
        </>
      }
    />
      <Route
      path="/allroute"
      element={
        < >
         <PrivateRoute roles={["admin"]}>
              <div className='wraperFooter'>
              <Navbar/>
              <AllRoute />
              </div>
              <Footer/>
          </PrivateRoute>
        </>
      }
    />
      <Route
      path="/videolist"
      element={
        <>
        <PrivateRoute roles={["editor", "admin"]}>
            <div className='wraperFooter'>
            <Navbar/>
            <VideoList/>
            </div>
            <Footer/>
        </PrivateRoute>
        </>
      }
    />
      {/* <Route
      path="/districts"
      element={
        <PrivateRoute roles={["admin","journalist", "editor"]}>
          <Navbar/>
          <DistrictList />
          <Footer/>
        </PrivateRoute>
      }
    /> */}
      <Route
      path="/videodeletionlogs"
      element={
        <PrivateRoute roles={["admin"]}>
          <div className='wraperFooter'>
          <Navbar/>
          <VideoDeletionLogs />
          </div>
          <Footer/>
        </PrivateRoute>
      }
    />

    
</Routes>
    

  );
}

export default App;
