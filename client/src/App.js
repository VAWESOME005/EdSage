import Login from "./auth/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./auth/Register";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import TeacherDashboard from "./teachers/TeacherDashboard";
import AssignMaterial from "./teachers/AssignMaterial";
import StudentDashboard from "./students/StudentDashboard";
import ViewMaterial from "./students/ViewMaterial";
import { useSelector } from "react-redux";
import LandingPage from "./LandingPage";

function App() {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    //using BEM convention for class naming (Ex. app__left, app__center, app__right)
    <div className="app">
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/teacher" component={TeacherDashboard} />
          {auth == null ? (
            <Route exact path="/" component={LandingPage} />
          ) : (
            <PrivateRoute exact path="/" component={StudentDashboard} />
          )}
          <PrivateRoute
            exact
            path="/assign-material/:classId"
            component={AssignMaterial}
          />
          <PrivateRoute
            exact
            path="/view-material/:classId"
            component={ViewMaterial}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
