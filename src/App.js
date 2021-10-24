import './App.css';
import Login from './Components/Login/Login';
import { BrowserRouter , Route, Switch} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import Navigator from './Components/Navigator/Navigator';
import Signup from './Components/Login/Signup';
import PublicPage from './Components/Public/PublicPage';
import { useState } from 'react';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
    <BrowserRouter>
      <Navigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Switch>
        <Route path="/" exact component={PublicPage}/>
        <Route path="/login" exact component={() => <Login setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path="/sign-up" exact component={Signup}/>
        <Route path="/dashboard" component={() => <Dashboard setIsLoggedIn={setIsLoggedIn} /> }/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
