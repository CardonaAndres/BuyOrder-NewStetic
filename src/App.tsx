import '@/app/assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/auth/contexts/AuthContext.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from '@/app/configs/config.ts';
import { HomePage } from '@/app/pages/HomePage.tsx';
import { DashboardPage } from './ocn/pages/DashboardPage';
import { ProtectedRoute } from './auth/components/ProtectedRoute';

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
            <Route path={router.ocn} element={<DashboardPage />} />

          </Route>

        </Routes>
      </Router>  
    </AuthProvider>
  )
}