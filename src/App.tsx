import '@/app/assets/css/index.css';
import { router } from '@/app/configs/config.ts';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from '@/app/pages/HomePage.tsx';

export const App = () => {
  return (
      <Router>
        <Routes>
          <Route path={router.home} element={<HomePage />} />
    
         
        </Routes>
      </Router>  
  )
}