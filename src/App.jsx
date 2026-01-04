import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DemoCall from './pages/DemoCall'; // Switched to Vapi Demo
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LiveCalls from './pages/LiveCalls';
import Analytics from './pages/Analytics';
import CallHistory from './pages/CallHistory';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<DemoCall />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="calls" element={<LiveCalls />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<CallHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
