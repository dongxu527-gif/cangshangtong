import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Radar from './pages/Radar';
import RadarDetail from './pages/RadarDetail';
import RadarPost from './pages/RadarPost';
import Policy from './pages/Policy';
import PolicyDetail from './pages/PolicyDetail';
import Finance from './pages/Finance';
import FinanceDemand from './pages/FinanceDemand';
import Emergency from './pages/Emergency';
import EmergencyPost from './pages/EmergencyPost';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import MyMatches from './pages/MyMatches';
import Messages from './pages/Messages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/radar" element={<Radar />} />
          <Route path="/radar/:id" element={<RadarDetail />} />
          <Route path="/radar/post" element={<RadarPost />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/policy/:id" element={<PolicyDetail />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/demand" element={<FinanceDemand />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/emergency/post" element={<EmergencyPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/posts" element={<MyPosts />} />
          <Route path="/profile/matches" element={<MyMatches />} />
          <Route path="/profile/messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
