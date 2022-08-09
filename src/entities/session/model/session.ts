import { createEffect, createEvent, createStore, sample } from "effector";

import { refreshSession, User } from "shared/api";
import { $token, tokenReceived, tokenErased } from "shared/token";

import { signInFx } from "./signin";
import { clickLogoutButton } from "./logout";

export const readyToLoadSession = createEvent()
export const getSessionFx = createEffect(refreshSession)
export const $session = createStore<User | null>(null)

$session
    .on(getSessionFx.doneData, (state, payload) => payload)
    .on(signInFx.doneData, (state, payload) => payload)
    .on(clickLogoutButton, (state, payload) => null)

export const $login = $session.map(state => state?.login)

export const $sessionLoading = getSessionFx.pending

//если токена нету сесия не грузится (рефреш)
sample({
    clock: readyToLoadSession,
    source: $token,
    filter: Boolean,
    target: getSessionFx
})

//если сесия загрузилась записать токен в локалстораге
export const $sessionIsLoaded = sample({
    clock: getSessionFx.doneData.map(payload => payload?.token),
    target: tokenReceived
})

//Удалить токен по если нажали кнопку выйти
sample({
    clock: clickLogoutButton,
    target: tokenErased
})