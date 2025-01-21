
import './App.css'
import Employee from './components/Employee'
import Header from './components/Header'
import ListEmployee from './components/ListEmployee'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ListEmployee />} />
          <Route path='/employees' element={<ListEmployee />} />
          <Route path='/add-employee' element={<Employee />} />
          <Route path='/edit-employee/:id' element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
