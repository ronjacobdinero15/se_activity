import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ShelvesList from './pages/ShelvesList'

import 'bootstrap/dist/css/bootstrap.min.css'
import AddShelf from './pages/AddShelf'
import EditShelf from './pages/EditShelf'
import ShelfList from './pages/ShelfList'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="container">
      <h1 className="mt-5 mb-5 text-center">
        <b>
          PHP React.js CRUD Application -{' '}
          <span className="text-primary">Create Delete Data API - 8</span>
        </b>
      </h1>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShelvesList />} />
            <Route path="/addShelf" element={<AddShelf />} />
            <Route path="/addItem/shelf/:shelf_id" element={<AddItem />} />
            <Route path="/edit/shelf/:shelf_id" element={<EditShelf />} />
            <Route path="/edit/item/:item_id" element={<EditItem />} />
            <Route path="/shelf/:shelf_id" element={<ShelfList />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
