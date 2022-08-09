import { RouterProvider } from 'atomic-router-react'
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from "history";
import { createHistoryRouter } from "atomic-router";
import { useUnit } from "effector-react";
import { createGlobalStyle } from "styled-components";

import { readyToLoadSession, $sessionLoading } from 'entities/session';
import { Layout } from "widgets/layout";
import { AppLoader } from "widgets/app-loader";
import { Pages, routesMap } from "pages";
import { $isAuthorized, tokenErased, tokenReceived } from "shared/token";
import { routes } from "shared/routes";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #000;
  }
`

//App start
const appIsReadyToLoad = createEvent()

const history = createBrowserHistory()
const router = createHistoryRouter({
    routes: routesMap
})

sample({
    clock: appIsReadyToLoad,
    fn: () => history,
    target: router.setHistory
})

//Загрузка сессии
sample({
    clock: appIsReadyToLoad,
    target: readyToLoadSession
})

//Редирект после логина
sample({
    clock: tokenReceived,
    source: $isAuthorized,
    filter: Boolean,
    target: routes.home.open
})

//Редирект на стриницу логина если не авторизован
sample({
    clock: [router.$path, tokenErased],
    source: $isAuthorized,
    filter: (s) => !Boolean(s),
    target: routes.login.open
})

appIsReadyToLoad()

const App = () => {
    const loading = useUnit($sessionLoading)

    if (loading)
        return <AppLoader/>

    return (
        <RouterProvider router={router}>
            <GlobalStyle/>
            <Layout>
                <Pages/>
            </Layout>
        </RouterProvider>
    )
}

export default App;