import { useState } from 'react';
import { supabase } from '../Config/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(error)
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        throw new Error(error.message);
      }

      alert("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
      {loading ? "Logging in..." : "Login with OTP"}
      </button>
    </div>
  );
};

export default Login;
