import { Home, Login ,Signup } from "../pages/index";
import { Loader, Navbar } from "./";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/index";

const Page404 = () => {
  return <h1>Error:404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
