import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import GamePage from "./Pages/Game/GamePage"
import User from "./Pages/User/User"
import SharedLayout from "./Pages/SharedLayout/SharedLayout"
import Error from "./Pages/Error/Error"

function App() {  

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />}/> 
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="user/:username" element={<User />}/>
        <Route path="game/:gameid" element={<GamePage />}/>
        <Route path="game" element={<Error />}/>
        <Route path="*" element={<Error />}/>
      </Route>
    </Routes>
  )
}

export default App
