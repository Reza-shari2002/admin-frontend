import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Tickets from "../modules/tickets/pages/Tickets";
import Transactions from "../modules/transactions/pages/Transactions";
import OtpLogs from "../modules/otp-code/pages/OtpLogs";
import Users from "../modules/users/pages/Users";
import AdminSeats from "../modules/seats/pages/AdminSeats";
import Login from "../modules/auth/pages/Login";
import Verify_otp from "../modules/auth/pages/Verify_otp.";
import Formcontext from "../context/Formcontext";
import NotFound from "../modules/not-found/pages/NotFound";
import Setting from "../modules/setting/pages/Setting";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/users" replace />, // ریدایرکت از روت اصلی به /home
    },
    { path: "/tickets", element: <Tickets></Tickets> },
    ,
    { path: "/transaction", element: <Transactions></Transactions> },
    {path:"/seats" , element:<AdminSeats></AdminSeats>},
    { path: "/login", element: <Login></Login> },
    { path: "/verify", element: <Verify_otp></Verify_otp> },
    { path: "/otplogs", element: <OtpLogs></OtpLogs> },
  {path:"/Setting" , element:<Setting></Setting>},
    { path: "/users", element: <Users></Users> },
    { path: "*", element: <NotFound /> },
  ] ,     {
      basename: "/admin",
    });
  return (
    <>
      <Formcontext>
        <RouterProvider router={router}></RouterProvider>
      </Formcontext>
    </>
  );
}

export default App;
