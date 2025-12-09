import { Routes, Route } from "react-router-dom";
import { Start } from "./pages/Start";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";
import { Request } from "./pages/Request";
import { Friends } from "./pages/Friends";
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
 

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navbar />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/connections" element={<Friends />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
