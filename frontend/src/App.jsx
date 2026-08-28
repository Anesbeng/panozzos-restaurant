import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages load eagerly — this is what real customers hit first,
// so there's no reason to pay a lazy-load waterfall for them.
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Galerie from "./pages/Galerie";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin pages are code-split: nobody browsing the public menu should
// have to download the dashboard, forms, and category editor. These
// only load the moment someone actually navigates to /admin/*.
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const DishForm = lazy(() => import("./pages/admin/DishForm"));
const CategoriesList = lazy(() => import("./pages/admin/CategoriesList"));
const CategoryForm = lazy(() => import("./pages/admin/CategoryForm"));

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-black text-white font-body text-sm">
    Chargement...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dish/:id" element={<DishDetail />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dishes"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <DishForm />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dishes/:id"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <DishForm />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories/all"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <CategoriesList />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories/new"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <CategoryForm />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories/:id"
          element={
            <ProtectedRoute>
              <Suspense fallback={<AdminFallback />}>
                <CategoryForm />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
