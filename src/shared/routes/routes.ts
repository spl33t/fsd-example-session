import { createRoute } from 'atomic-router';
import { chainAnonymous, chainAuthenticated } from "./hooks";
import { sample } from "effector";

export const routes = {
    home: createRoute(),
    about: createRoute(),
    login: createRoute(),
};

//Редиректы на страницу логина если юзер не авторизован
sample({
    clock: [
        chainAnonymous(routes.home).opened,
        chainAnonymous(routes.about).opened
    ],
    target: routes.login.open,
})

//Редирект на главную страницу если авторизованый зайдет на страницу логина
sample({
    clock: chainAuthenticated(routes.login).opened,
    target: routes.home.open,
})

