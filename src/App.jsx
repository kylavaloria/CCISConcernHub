import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SignIn } from './pages/signin';
import { Portal } from './pages/portal';
import { SubmitConcern } from './pages/submitConcern';
import { MyConcerns } from "./pages/myConcerns";
import { AdminDashboard } from "./pages/adminDashboard";
import { ViewConcern } from './pages/viewConcern';
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
      } else {
        setUserData(null);
      }
    })();
  }, [clientUser]);

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
        "showStudentNavbarProp": false,
      }
    },
    "/submit-concern": {
      "element": <SubmitConcern />,
      "headerProps": {
        "isSolid": true,
        "showStudentNavbarProp": true,
      }
    },
    "/my-concerns": {
      "element": <MyConcerns userData={userData} />,
      "headerProps": {
        "isSolid": true,
        "showStudentNavbarProp": true,
      }
    },
    "/admin-dashboard": {
      "element": <AdminDashboard userData={userData} />,
      "headerProps": {
        "isSolid": true,
        "showStudentNavbarProp": false,
      }
    },
    "/view-concern/:id": {
      "element": <ViewConcern />,
      "headerProps": {
        "isSolid": true,
        "showStudentNavbarProp": false,
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
                userData={userData}
              />
            } />;
          })
        }
      </Routes>
    </Router>
  );
}
