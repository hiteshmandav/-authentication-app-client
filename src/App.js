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



function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <BrowserRouter>
      {/* <Navigator/> */}
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/verify-email" component={VerifyEmail} />
        <Route path="/login" exact component={Login}/>
        <Route path="/forgot-password" exact component={ForgotPassword}/>
        <Route path="/sign-up" exact component={Signup}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
