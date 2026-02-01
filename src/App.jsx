import "./App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import Nav from "./components/Nav"

const App = () => {
  return (
    <div>
      <h1>This is my Login/SignUp Page</h1>
      <Nav />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </Router>
      <h1>Footer</h1>
    </div>
  )
}

export default App