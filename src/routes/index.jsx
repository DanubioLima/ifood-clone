import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}