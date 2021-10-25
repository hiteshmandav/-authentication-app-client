import './App.css';
import Login from './Components/Authentication/Login';
import { BrowserRouter , Route, Switch} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
// import Navigator from './Components/Navigator/Navigator';
import Signup from './Components/Authentication/Signup';
// import PublicPage from './Components/Public/PublicPage';
// import { useState } from 'react';
import PrivateRoute from './PrivateRoute';
import VerifyEmail from './Components/Authentication/VerifyEmail';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ResetNewPassword from './Components/Authentication/ResetNewPassword';
import VerifyAccount from './Components/Authentication/VerifyAccount';
import Actions from './Components/Dashboard/Actions';
import NotFound from './Components/NotFound';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <BrowserRouter>
      {/* <Navigator/> */}
      <Switch>
        <PrivateRoute exact path="/" component={Actions} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/verify-email" component={VerifyEmail} />
        <Route path="/login" exact component={Login}/>
        <Route path="/sign-up" exact component={Signup}/>
        <Route path="/forgot-password" exact component={ForgotPassword}/>
        <Route path="/password-reset/:resetId" exact component={ResetNewPassword}/>
        <Route path="/verify-account/:verifyId" exact component={VerifyAccount}/>
        <Route path="*"  component={NotFound}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
