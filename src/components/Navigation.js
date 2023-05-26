import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { supabase } from "../Config/supabaseClient";

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

//   const [username, setUsername] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
    const getSessionData = async () => {
      const session = await supabase.auth.getSession();
      if (session && session.data.session && session.data.session.user) {
        const username_extracted = session.data.session.user.email.split('@')[0];
        // setUsername(username_extracted); 
        setLoggedIn(true)
      }
      else{
        setLoggedIn(false)
      }
    };

    getSessionData();


    // const handleLogout = async () => {
    //     await supabase.auth.signOut();
    //     setLoggedIn(false);
    // };

    // handleLogout()
  }, [])

  

  return (
    <nav>
      <h1>Notes</h1>
      <Link className={currentPath === '/' ? 'activeLink' : 'Link'} to="/">Home</Link>
      <Link className={currentPath === '/create' ? 'activeLink' : 'Link'} to="/create">Create</Link>
      {loggedIn ? (
        <Link className={currentPath === '/logout' ? 'activeLink' : 'Link'} to="/logout">Logout</Link>
      ) : (
        <Link className={currentPath === '/login' ? 'activeLink' : 'Link'} to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navigation