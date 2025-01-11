
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CreateRequestProjectPage from './pages/CreateRequestProjectPage'
import MyRequestProjectsPage from './pages/MyRequestProjectsPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/ingreso"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/registro"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/crear-peticion"
          element={
            <MainLayout>
              <CreateRequestProjectPage />
            </MainLayout>
          }
        />

        <Route
          path="/mis-datos"
          element={
            <MainLayout>
              <UserPage />
            </MainLayout>
          }
        />

        <Route
          path="/mis-peticiones"
          element={
            <MainLayout>
              <MyRequestProjectsPage />
            </MainLayout>
          }
        />

        {/* Ruta de "Página no encontrada" */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </>
  )
}

export default App
