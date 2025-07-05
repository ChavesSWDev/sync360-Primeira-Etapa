import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import UserProfile from "./pages/UserProfile"
import EditProfileForm from "./pages/EditProfileForm"
import CreateUser from "./pages/CreateUser"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/create" element={<CreateUser />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/profile/edit/:id" element={<EditProfileForm />} />
    </Routes>
  )
}
