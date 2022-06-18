import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { App } from "./components";
import { Toaster } from "react-hot-toast";
import { AuthProvider, PostsProvider } from "./providers";

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
