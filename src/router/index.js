import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../screens/login";
import { useSelector } from "react-redux";
import SignUp from "../screens/signup";
import DisplayTask from "../screens/display-task";
import CreateUpdateTask from "../screens/create-update-task";


const ApplicationRoutes = () => {

  const { user } = useSelector(state => state.user)

  return (
    <Routes>
      {
        user ?
          <Route>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/' element={<DisplayTask />} />
            <Route path='/create-task' element={<CreateUpdateTask />} />
            <Route path='/update-task' element={<CreateUpdateTask />} />
          </Route>
          :
          <Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
      }
    </Routes>
  );
}

export default ApplicationRoutes;