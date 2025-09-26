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
import { SupplierOrders } from './npo/pages/SupplierOrders';
import { TokenGuard } from './npo/components/supplierOrders/TokenGuard';
import { EmailCheck } from './npo/pages/EmailCheck';
import { AdminPage } from './admin/pages/AdminPage';
import { UserAdminPage } from './admin/pages/UserAdminPage';
import { MessagesTypesManager } from './admin/pages/MessagesTypesManager';

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
              <Route path={router.emailChek} element={<EmailCheck />} />

              <Route path={router.adminPage} element={<AdminPage />} />
              <Route path={router.adminUserPage} element={<UserAdminPage />} />
              <Route path={router.adminMessagesManager} element={<MessagesTypesManager />} />
          </Route>

          <Route element={<TokenGuard />}>
            <Route path={`${router.supplierOrder}:token`} element={<SupplierOrders />} />
          </Route>

        </Routes>
      </Router>  
    </AuthProvider>
  )
}