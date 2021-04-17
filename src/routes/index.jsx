import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SearchAddress from '../pages/SearchAddress';
import Maps from '../pages/Maps';
import SaveAddress from '../pages/SaveAddress';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={SearchAddress} />
                <Route exact path="/maps" component={Maps} />
                <Route exact path="/save-address" component={SaveAddress} />
            </Switch>
        </BrowserRouter>
    )
}