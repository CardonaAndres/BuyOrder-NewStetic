import '@/app/assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/auth/contexts/AuthContext.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from '@/app/configs/config.ts';
import { HomePage } from '@/app/pages/HomePage.tsx';
import { ProtectedRoute } from './auth/components/ProtectedRoute';
import { NpoPage } from './npo/pages/NpoPage';
import { SuppliersPage } from './npo/pages/SuppliersPage';

export const App = () => {
  return (
    <AuthProvider>
       <Router>
        <ToastContainer
          position="top-left"
          limit={1}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path={router.home} element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
              <Route path={router.npo} element={<NpoPage />} />
              <Route path={router.suppliers} element={<SuppliersPage />} />

          </Route>

        </Routes>
      </Router>  
    </AuthProvider>
  )
}