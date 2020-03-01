import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
    return (
        <BrowserRouter>
            {/* O Switch faz que uma rota seja chamada por momento */}
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repository" component={Repository} />
            </Switch>
        </BrowserRouter>
    );
}
