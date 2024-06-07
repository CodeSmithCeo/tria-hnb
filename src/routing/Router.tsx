import React from 'react';
import useUrlChange from 'hooks/useUrlChange';
import RouterContextProvider from 'routing/RouterContext';
import type {Route} from 'routing/routes';
import routes from 'routing/routes';

type Router = () => JSX.Element;

const Router: Router = () => {
    const { pathPartials } = useUrlChange();

    const findMatchingRoute = (pathname: string): Route | undefined => {
        return routes.find(route => {
            const routePathParts = route.path.split('/');
            const pathParts = pathname.split('/');

            if (routePathParts.length !== pathParts.length) return false;

            for (let i = 0; i < routePathParts.length; i++) {
                if (routePathParts[i].startsWith(':')) continue;
                if (routePathParts[i] !== pathParts[i]) return false;
            }

            return true;
        });
    };

    const currentPath = '/' + (pathPartials.join('/') || '');

    let matchedRoute = findMatchingRoute(currentPath);

    if (!matchedRoute) matchedRoute = routes.find(route => route.path === '/404') as Route;

    const { path: routePath } = matchedRoute;
    const routePathParts = routePath.split('/').filter(Boolean);
    const params: { [key: string]: string | null } = {};

    routePathParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1); // Remove the ':' prefix
            params[paramName] = pathPartials[index];
        }
    });

    return (
        <RouterContextProvider {...params}>
            {matchedRoute.component()}
        </RouterContextProvider>
    );
};

export default Router;
