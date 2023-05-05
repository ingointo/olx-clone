import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from "./Pages/Home";
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import "./App.css";
import Post from './store/PostContext'

function App() {
  const { setUser } = useContext(AuthContext)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
