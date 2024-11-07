import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ShelvesList from './pages/ShelvesList'

import 'bootstrap/dist/css/bootstrap.min.css'
import AddShelf from './pages/AddShelf'
import EditShelf from './pages/EditShelf'
import ShelfList from './pages/ShelfList'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import Register from './pages/Register'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from './ui/AppLayout'
import User from './pages/User'
import { Toaster } from 'react-hot-toast'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-center h2">
        <b>
          PHP React.js CRUD Application -{' '}
          <span className="text-primary">Create Delete Data API - 8</span>
        </b>
      </h1>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<ShelvesList />} />
              <Route path="/addShelf" element={<AddShelf />} />
              <Route path="/addItem/shelf/:shelf_id" element={<AddItem />} />
              <Route path="/edit/shelf/:shelf_id" element={<EditShelf />} />
              <Route path="/edit/item/:item_id" element={<EditItem />} />
              <Route path="/shelf/:shelf_id" element={<ShelfList />} />
              <Route path="/user/:user_id" element={<User />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '800px',
              padding: '16px 24px',
            },
          }}
        />
      </QueryClientProvider>
    </div>
  )
}

export default App
