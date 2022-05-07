import styles from "../styles/login.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { login } from "../api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setloggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloggingIn(true);

    if (!email || !password) {
      toast.error("Enter Eamil & Password");
      setloggingIn(false);
    }

    const response = await login(email,password) 

    if (response.success) {
        toast.success('Successfully LogedIn')
    } else {
        toast.error(response.message)
    }
    setloggingIn(false);

  };

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
      <div className={styles.field} >
        <button disabled={loggingIn}>{loggingIn ? "loggingIn..." : "LogIn"}</button>
      </div>
    </form>
  );
};

export default Login;
