
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CreateRequestProjectPage from './pages/CreateRequestProjectPage'

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

        {/* Ruta de "Página no encontrada" */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </>
  )
}

export default App
