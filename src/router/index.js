import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/home";
import LogIn from "../components/login";
import { useSelector } from "react-redux";
import SignUp from "../components/signup";


const ApplicationRoutes = () => {

  const { user } = useSelector(state => state.user)

  // console.log(user)

  return (
    <Routes>
      {
        user ?
          <Route>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/' element={<Home />} />
          </Route>
          :
          <Route>
            <Route path="*" element={<Navigate to="/login" replace/>} />
            <Route path='/login' element={<LogIn />} />
            <Route path="/signup" element={<SignUp/>} />
          </Route>
      }
    </Routes>
  );
}

export default ApplicationRoutes;