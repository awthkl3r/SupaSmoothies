import { BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react"
import Navigation from "./components/Navigation"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./components/Login"

function App() {

  const [username, setUsernameC] = useState("")

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home setUsername={setUsernameC} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create" element={<Create username={username} />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
