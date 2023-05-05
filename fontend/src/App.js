import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import VotingPage from './components/VotingPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/VotingPage' element={<VotingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
