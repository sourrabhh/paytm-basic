import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' Component={Signup} />
          <Route path='/signin' Component={Signin} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/send' Component={Send} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
