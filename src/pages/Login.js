import styles from "../styles/login.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setloggingIn] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloggingIn(true);

    if (!email || !password) {
      toast.error("No Eamil & Password Entered");
      setloggingIn(false);
      return;
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast.success("Successfully LogedIn");
    } else {
      toast.error(response.message);
    }
    setloggingIn(false);
  };

  if(auth.user){
    return <Navigate to='/' />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Login</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "loggingIn..." : "LogIn"}
        </button>
      </div>
    </form>
  );
};

export default Login;
