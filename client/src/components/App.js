import Select from "./register/Select";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import { ContactUs } from "./register/email";
import Main from "./MainClassroom/Main";
import AnnoucementBox from "./MainClassroom/AnnoucementBox";
import ProtectedRoute from "./Protected/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Select />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          {/* <Route exact path="/email">
            <ContactUs />
          </Route> */}
          <ProtectedRoute exact path="/main" component={Main} />
          <ProtectedRoute
            exact
            path="/Announcement"
            component={AnnoucementBox}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
