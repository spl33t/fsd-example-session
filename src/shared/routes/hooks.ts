import { buildPath, chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery, RouteQuery } from "atomic-router";
import { useRouter } from "atomic-router-react";
import { createEvent, sample } from "effector";
import { not } from "patronum";

import { $isAuthorized } from "../token";

/**
 * Clones the passed route and opens it only if user is authenticated
 * @param route Original route
 * @returns New route
 */
export function chainAuthenticated<Params>(route: RouteInstance<Params>) {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

    const alreadyAuthorized = sample({
        clock: sessionCheckStarted,
        filter: $isAuthorized,
    });

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: alreadyAuthorized,
    });
}

/**
 * Clones the passed route and opens it only if user is anonymous
 * @param route Original route
 * @returns New route
 */
export function chainAnonymous<Params>(route: RouteInstance<Params>) {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

    const alreadyAnonymous = sample({
        clock: sessionCheckStarted,
        filter: not($isAuthorized),
    });

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: alreadyAnonymous,
    });
}

export function usePath<T extends RouteParams>(
    route: RouteInstance<T>,
): (params: T, query?: RouteQuery) => string {
    const router = useRouter();
    const routeObj = router.routes.find((routeObj) => routeObj.route === route);

    if (!routeObj) {
        throw new Error('[RouteLink] Route not found');
    }

    return (params, query = {}) =>
        buildPath({
            pathCreator: routeObj.path,
            params: params || {},
            query: query || {},
        });
}

export function useLink<T extends RouteParams>(
    route: RouteInstance<T>,
    params: T,
    query: RouteQuery = {},
) {
    const builder = usePath(route);

    return builder(params, query);
}