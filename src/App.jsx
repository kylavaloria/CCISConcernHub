import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/signin';
import { Portal } from './pages/portal';
import { Registration } from './pages/registration';
import { LandingPage } from './pages/landingPage';
import { SubmitConcern } from './pages/submitConcern';
import { MyConcerns } from './pages/myConcerns';
import { AdminDashboard } from './pages/adminDashboard';
import { ViewConcern } from './pages/viewConcern';
import { AccountSettings } from './pages/accountSettings';
import { EditUserProfile } from './pages/editUserProfile';

function App() {

  const user = {
    role: 'student', // Change to 'admin' to test the account settings
    username: 'JohnDoe',
    department: 'Department of Computer Science',
    studentNumber: '2022-XXXXX-MN-X',
    email: 'john.doe@gmail.com',
    assignedCategories: ['Complaints', 'Inquiries']
};

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/submit-concern" element={<SubmitConcern />} />
        <Route path="/my-concerns" element={<MyConcerns />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-concern/:id" element={<ViewConcern />} />
        <Route path="/account-settings" element={<AccountSettings user={user} />} />
        <Route path="/edit-user-profile" element={<EditUserProfile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
