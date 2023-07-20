// import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Create from "./Create";
import NavBar from "./NavBar";
import Update from "./Update";
import Login from "./Login";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from './SignUp';
import MaybeShowNavBar from './MaybeShowNavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MaybeShowNavBar>
          <NavBar/>
        </MaybeShowNavBar>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/update/:rno" element={<Update/>} />
          <Route path="/signup" element={<SignUp/>}></Route>

          <Route path="*" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
