import { createEvent, sample } from 'effector';
import { useUnit } from "effector-react";

import { createHistoryRouter } from "atomic-router";
import { RouterProvider } from 'atomic-router-react'
import { createBrowserHistory } from "history";

import { createGlobalStyle } from "styled-components";
import { reset } from 'styled-reset';

import { readyToLoadSession, $sessionLoading } from 'entities/session';
import { Layout } from "widgets/layout";
import { AppLoader } from "widgets/app-loader";
import { Pages, routesMap } from "pages";

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

appIsReadyToLoad()

const App = () => {
    const sessionLoading = useUnit($sessionLoading)

    if (sessionLoading)
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