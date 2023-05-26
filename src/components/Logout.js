import { useState } from 'react';
import { supabase } from '../Config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      alert("You have been logged out successfully.");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
      navigate('/')
    }
  };

  return (
    <div className="logout">
      <h1>Logout</h1>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'Logging out...' : 'Log out'}
      </button>
    </div>
  );
};

export default Logout;