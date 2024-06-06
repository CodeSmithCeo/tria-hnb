import React from 'react';
import Home from 'pages/Home';
import AllExchanges from 'pages/AllExchanges';
import ExchangeHistory from 'pages/ExchangeHistory';
import Page404 from 'pages/Page404';

export type Route = {
    path: string;
    component: any;
}

const routes: Route[] = [
    { path: `/`, component: () => <Home /> },
    { path: `/tecaj`, component: () => <AllExchanges /> },
    { path: `/povijest/:valuta`, component: () => <ExchangeHistory /> },
    { path: `/povijest/:valuta/:datum`, component: ()=> <ExchangeHistory /> },
    { path: `/404`, component: () => <Page404 /> },
];

export default routes;
