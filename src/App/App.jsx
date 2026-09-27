import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Tickets from "../modules/tickets/pages/Tickets";

import Contact_us from "../modules/Contact-us/pages/Contact_us";
import Login from "../modules/auth/pages/Login";
import Verify_otp from "../modules/auth/pages/Verify_otp.";
import Formcontext from "../context/Formcontext";
import NotFound from "../modules/not-found/pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />, // ریدایرکت از روت اصلی به /home
    },
    {path:"/tickets" , element: <Tickets></Tickets>}
    ,

    { path: "/login", element: <Login></Login> },
    { path: "/verify", element: <Verify_otp></Verify_otp> },

    { path: "/Contact-us", element: <Contact_us></Contact_us> },

    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <Formcontext>
        <RouterProvider router={router}></RouterProvider>
      </Formcontext>
    </>
  );
}

export default App;
