import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SearchAddress from '../pages/SearchAddress';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={SearchAddress} />
            </Switch>
        </BrowserRouter>
    )
}