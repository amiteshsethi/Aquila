import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [signingup, setSigningupp] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningupp(true);

    if (!email || !password || !name || !confirmpassword) {
      toast.error("Form Details not Filled Properly");
    }

    if (password !== confirmpassword) {
      toast.error("Passwords dont match");
    }

    const response = await auth.signup(
      email,
      name,
      password,
      confirmpassword
    );

    if (response.success) {
      // navigate('/login')
      toast.success("Successfully SignUped !!!");
      toast.success("You Can Log - In now . ");

      setSigningupp(false)
    } else {
      toast.error(response.message);
    }
    setSigningupp(false);
  };

  if(auth.user){
    return <Navigate to="/" />
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>SignUp for Aquilla</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="name"
          placeholder="Name :"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Create new Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm new Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingup}>
          {signingup ? "SignIn-ing..." : "SignUp"}
        </button>
      </div>
    </form>
  );
};

export default Signup;
