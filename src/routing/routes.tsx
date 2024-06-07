import React from 'react';
import Home from 'pages/Home';
import AllExchanges from 'pages/all-exchanges/AllExchanges';
import ExchangeHistory from 'pages/currency-history/CurrencyHistory';
import Page404 from 'pages/Page404';

export type Route = {
    path: string;
    component: any;
}

const routes: Route[] = [
    { path: `/`, component: () => <Home /> },
    { path: `/tecaj`, component: () => <AllExchanges /> },
    { path: `/povijest/:currency`, component: () => <ExchangeHistory /> },
    { path: `/povijest/:currency/:date`, component: ()=> <ExchangeHistory /> },
    { path: `/404`, component: () => <Page404 /> },
];

export default routes;
