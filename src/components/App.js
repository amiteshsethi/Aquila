import { useEffect, useState } from "react";
import { getPost } from "../api";
import { Home, Login } from "../pages";
import { Loader, Navbar } from "./";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const About = () => {
  return <h1>about</h1>;
};

const UserInfo = () => {
  return <h1>userinfo</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPost();
      // console.log("response", response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/asasa" element={<UserInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
