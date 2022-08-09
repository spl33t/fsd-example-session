import { RouterProvider } from 'atomic-router-react'
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from "history";
import { createHistoryRouter } from "atomic-router";
import { useUnit } from "effector-react";
import { createGlobalStyle } from "styled-components";
import { reset } from 'styled-reset';

import { readyToLoadSession, $sessionLoading } from 'entities/session';
import { AppLayout } from "widgets/app-layout";
import { AppLoader } from "widgets/app-loader";
import { Pages, routesMap } from "pages";
import { $isAuthorized, tokenErased, tokenReceived } from "shared/token";

import {LoginPage} from "pages/login";
import {HomePage} from "pages/home";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: Arial;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  h1{
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
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
    target: HomePage.route.open
})

//Редирект на стриницу логина при открытии любой страницы приложения если пользователь не авторизован
sample({
    clock: [router.$path, $isAuthorized, tokenErased],
    source: $isAuthorized,
    filter: (s) => !Boolean(s),
    target: LoginPage.route.open
})

appIsReadyToLoad()

const App = () => {
    const sessionLoading = useUnit($sessionLoading)

    if (sessionLoading)
        return <AppLoader/>

    return (
        <RouterProvider router={router}>
            <GlobalStyle/>
            <AppLayout>
                <Pages/>
            </AppLayout>
        </RouterProvider>
    )
}

export default App;