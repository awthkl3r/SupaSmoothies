import { BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"

import { supabase } from "./Config/supabaseClient"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./components/Login"
import Logout from "./components/Logout"

function App() {

  const [username, setUsername] = useState("")

  useEffect(()=>{
    const getSessionData = async () => {
      const session = await supabase.auth.getSession();
      if (session && session.data.session && session.data.session.user) {
        const username_extracted = session.data.session.user.email.split('@')[0];
        // if(username_extracted == " "){
          
        // }
        setUsername(username_extracted);
      }
      else{
        localStorage.clear()
      }
    };

    getSessionData();
  }, [])

  return (
    <BrowserRouter>
      <div className="navContainer">
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
