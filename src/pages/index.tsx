import { Route } from "atomic-router-react";

import { routes } from "shared/routes";

import { HomePage } from "./home"
import { AboutPage } from "./about"
import { LoginPage } from "./login";

export const routesMap = [
    {path: '/', route: routes.home},
    {path: '/about', route: routes.about},
    {path: '/login', route: routes.login},
]

export const Pages = () => {
    return <>
        <Route route={routes.home} view={HomePage}/>
        <Route route={routes.about} view={AboutPage}/>
        <Route route={routes.login} view={LoginPage}/>
    </>
}