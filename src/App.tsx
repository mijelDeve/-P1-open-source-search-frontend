
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CreateRequestProjectPage from './pages/CreateRequestProjectPage'
import MyRequestProjectsPage from './pages/MyRequestProjectsPage'
import UserPage from './pages/UserPage'
import PrivateRoute from './router/PrivateRouter'
import PublicRoute from './router/PublicRouter'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ingreso"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/registro"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/crear-peticion"
          element={
            <PrivateRoute>
              <MainLayout>
                <CreateRequestProjectPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/mis-datos"
          element={
            <PrivateRoute>
              <MainLayout>
                <UserPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/mis-peticiones"
          element={
            <PrivateRoute>
              <MainLayout>
                <MyRequestProjectsPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Ruta de "Página no encontrada" */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </>
  )
}

export default App
