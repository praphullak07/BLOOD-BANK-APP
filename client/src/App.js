import {Routes,Route} from 'react-router-dom'
import HomePage from './routers/HomePage';
import Login from './routers/auth/Login';
import Register from './routers/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/routes/protectedRoute';
import PublicRoute from './components/routes/publicRoute';
import Donor from './routers/Dashboard/Donor';
import Hospital from './routers/Dashboard/Hospital';
import Organisation from './routers/Dashboard/Organisation';
import Consumer from './routers/Dashboard/Consumer';
import Donations from './routers/Donations';
import Analytics from './routers/Dashboard/Analytics';
import HospitalList from './routers/Admin/HospitalList';
import DonorList from './routers/Admin/DonorList';
import OrgList from './routers/Admin/OrgList';
import AdminHome from './routers/Admin/AdminHome';

function App() {
  return (
   <div>
    <ToastContainer />
    <Routes>

      
      <Route path ='/donor' element={
        <ProtectedRoute>
           <Donor />
        </ProtectedRoute>
       }
        
      />
      <Route path ='/hospitals' element={
        <ProtectedRoute>
           <Hospital/>
        </ProtectedRoute>
       }
        
      />

      <Route path ='/consumer' element={
        <ProtectedRoute>
           <Consumer/>
        </ProtectedRoute>
       }
        
      />

      <Route path ='/donations' element={
        <ProtectedRoute>
           <Donations/>
        </ProtectedRoute>
       }
        
      />
      <Route path ='/organisation' element={
        <ProtectedRoute>
           <Organisation/>
        </ProtectedRoute>
       }
        
      />
       <Route path ='/' element={
        <ProtectedRoute>
           <HomePage/>
        </ProtectedRoute>
       }
        
      /> 

      <Route path ='/login' element={
        <PublicRoute>
           <Login/>
        </PublicRoute>
      
        
      }/>

      <Route path ='/register' element={
        <PublicRoute>
            <Register/>
        </PublicRoute>
       
        
      }/>
       <Route path ='/analytics' element={
        <ProtectedRoute>
           <Analytics />
        </ProtectedRoute>
       }
        
      />
      <Route path ='/hospital-list' element={
        <ProtectedRoute>
           <HospitalList />
        </ProtectedRoute>
       }
      />

      <Route path ='/donor-list' element={
        <ProtectedRoute>
           <DonorList />
        </ProtectedRoute>
       }
        
      />
      <Route path ='/org-list' element={
        <ProtectedRoute>
           <OrgList />
        </ProtectedRoute>
       }
        
      />

      <Route path ='/admin' element={
        <ProtectedRoute>
           <AdminHome />
        </ProtectedRoute>
       }
        
      />


    </Routes>

    </div>
  );
};

export default App;
