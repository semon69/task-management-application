import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='bg-indigo-950 text-white min-h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
