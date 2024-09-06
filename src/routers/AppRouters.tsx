import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const NotFoundPage = React.lazy(() => import("../pages/NotFound.tsx"));
const LoaderPage = React.lazy(() => import("../component/Loader.tsx"));
const ProductsList = React.lazy(() => import("../pages/ProductsList.tsx"));
const ProductsForm = React.lazy(() => import("../pages/ProductsForm.tsx"));

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoaderPage open={true} onClose={() => {}} />}>
      <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<ProductsList />} />
            <Route path="form" element={<ProductsForm />} />
            <Route path="form/:id" element={<ProductsForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouters;
