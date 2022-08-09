import { Route } from "atomic-router-react";

import { HomePage } from "./home"
import { AboutPage } from "./about"
import { LoginPage } from "./login";

export const routesMap = [
    {path: '/', route: HomePage.route},
    {path: '/about', route: AboutPage.route},
    {path: '/login', route: LoginPage.route},
]

export const Pages = () => {
    return <>
        <Route route={HomePage.route} view={HomePage.page}/>
        <Route route={AboutPage.route} view={AboutPage.page}/>
        <Route route={LoginPage.route} view={LoginPage.page}/>
    </>
}