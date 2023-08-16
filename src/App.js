import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import UpdateProfile from './component/UpdateProfile';
import Home from "./pages/Home"
import Navi from "./base/Navi"
import Register from "./pages/Register";
import { Container } from 'reactstrap';
import LoginForm from './component/LoginForm'
import { useSelector } from 'react-redux'
import Scorms from './pages/Scorms';

function App() {
  const { user } = useSelector(state => state.auth)
  console.log(user)
  return (
    <div className="App" color='dark' >
      <Navi></Navi>
      <Container>
        <Toaster
          position='top-right'
        />
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='profile/' element={<UpdateProfile />} />
              <Route path='scorms/' element={<Scorms />} />
            </>
          ) : (
            <>
              <Route path='register/' element={<Register />} />
              <Route path='*' element={
                <LoginForm/>
              } />
            </>
          )}

        </Routes>
      </Container>
    </div>
  );

}

export default App;
