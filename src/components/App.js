import Select from './register/Select';
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import db from './firebase';
import Home from './Home/Home';
import { ContactUs } from './register/email';
import Main from './MainClassroom/Main';
import AnnoucementBox from './MainClassroom/AnnoucementBox';

function App () {
    useEffect(() => {
        console.log(db.collection('First').onSnapshot((snap => {
            snap.docs.map(doc => {
                console.log(doc.data().Name);
            });
        })));
    });
    return (
        <div className = "app">
            <Router>
                <Switch>
                    <Route exact path = "/">
                        <Select/>
                    </Route>
                    <Route path = "/home">
                        <Home/>
                    </Route>
                    <Route path = "/email">
                        <ContactUs/>
                    </Route>
                    <Route path = "/main">
                        <Main/>
                    </Route>
                    <Route path = "/Announcement">
                            <AnnoucementBox/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
