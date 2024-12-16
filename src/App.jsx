import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SignIn } from './pages/signin';
import { Portal } from './pages/portal';
import { SubmitConcern } from './pages/submitConcern';
import { MyConcerns } from "./pages/myConcerns";
import { AdminDashboard } from "./pages/adminDashboard";
import { ViewConcern } from './pages/viewConcern';
import { AccountSettings } from './pages/accountSettings';
import { EditUserProfile } from './pages/editUserProfile';
import RouteElement from './components/route';
import ClientUser from './auth/clientUser';

export default function App() {
  /** @type {[undefined | null | ClientUser, any]} */
  const [clientUser, _setClientUser] = useState(undefined);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    ClientUser.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser === null) {
        _setClientUser(null);
      } else {
        _setClientUser(new ClientUser(firebaseUser));
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (clientUser) {
        setUserData(await clientUser.getUserFromDatabase());
      }
    })();
  }, [clientUser]);

  const user = {
    role: 'student', // Change to 'admin' to test the account settings
    username: 'JohnDoe',
    department: 'Department of Computer Science',
    studentNumber: '2022-XXXXX-MN-X',
    email: 'john.doe@gmail.com',
    assignedCategories: ['Complaints', 'Inquiries']
  };

  const routeMap = {
    "/signin": {
      "element": <SignIn clientUser={clientUser} />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/portal": {
      "element": <Portal />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/submit-concern": {
      "element": <SubmitConcern />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/my-concerns": {
      "element": <MyConcerns userData={userData} />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/admin-dashboard": {
      "element": <AdminDashboard userData={userData} />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/view-concern/:id": {
      "element": <ViewConcern />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/account-settings": {
      "element": <AccountSettings user={user} />,
      "headerProps": {
        "isSolid": false,
      }
    },
    "/edit-user-profile": {
      "element": <EditUserProfile user={user} />,
      "headerProps": {
        "isSolid": false,
      }
    },
  }

  routeMap["/"] = routeMap["/signin"]; // The root path is just the signin page
  routeMap["*"] = routeMap["/signin"]; // Fallback to signin page if the user went to an invalid path

  return (
    <Router>
      <Routes>
        {
          Object.entries(routeMap).map(([path, value]) => {
            return <Route key={path} path={path} element={
              <RouteElement
                element={value["element"]}
                headerProps={value["headerProps"]}
                clientUser={clientUser}
              />
            } />;
          })
        }
      </Routes>
    </Router>
  );
}
