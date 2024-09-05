import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const ProductsList = React.lazy(() => import("../pages/ProductsList.tsx"));
const ProductsForm = React.lazy(() => import("../pages/ProductsForm.tsx"));

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<>Londing</>}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<ProductsList />} />
            <Route path="form" element={<ProductsForm />} />
            <Route path="form/:id" element={<ProductsList />} />
          </Route>
          <Route path="*" element={<>NotFoundPage</>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouters;
