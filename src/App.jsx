import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import DashboardLayout from "./components/DashboardLayout";
import Links from "./pages/Links";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter
      basename="/13-react-link-sharing-app"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Links />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
