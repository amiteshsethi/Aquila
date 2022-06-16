import { Home, Login, Signup, Settings,UserProfile } from "../pages/index";
import { Loader, Navbar } from "./";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/index";

// this is creating a private route in v5 of react

// function PrivateRoute({ children, ...rest }) {
//   // ...rest brings the props here to Route
//   // children here bring the component

//   const auth = useAuth();

//   return (
//     <Route
//       {...rest} // points  to path == '/settings or /login or /signup
//       render={() => {
//         if (auth.user) {
//           return children; // points to <settings/> , <anyother /> component
//         }
//         return <Navigate to="/login" />;
//       }}
//     />
//   );
// }

// for more info = https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

// creating aprivate route function in now v6

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

function Error404() {
  return(
    <>
      <h1>Error : 404 !! </h1>
      <h3> The page you are looking for is not found </h3>
    </>
  )
}

function App() {
  const auth = useAuth();
  // console.log('auth',auth);

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
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
