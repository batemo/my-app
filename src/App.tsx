import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserManagementContainer } from './ui/UserManagementContainer';
import { Flex } from './ui/layout';
import { colors } from './ui/tokens';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => (
  <Router>
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '100vh', background: colors.background }}>
      <Routes>
        <Route path="/" element={<UserManagementContainer />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Flex>
  </Router>
);

export default App; 