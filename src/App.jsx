import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
