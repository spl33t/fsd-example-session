import { createEffect, createEvent, createStore, sample } from "effector";

import { refreshSession, User } from "shared/api";
import { $token, tokenErased, tokenReceived } from "shared/token";

import { signInFx } from "./signin";

export const readyToLoadSession = createEvent()
export const getSessionFx = createEffect(refreshSession)
export const $session = createStore<User | null>(null)

$session
    .on(getSessionFx.doneData, (state, payload) => payload)
    .on(signInFx.doneData, (state, payload) => payload)
    .reset(tokenErased)

export const $login = $session.map(state => state?.login)

export const $sessionLoading = getSessionFx.pending

//если токена нету сесия не грузится (рефреш)
sample({
    clock: readyToLoadSession,
    source: $token,
    filter: Boolean,
    target: getSessionFx
})

//если в сторе сессии есть токен записать в локалстораге
sample({
    clock: $session.map(state => state?.token),
    filter: Boolean,
    target: tokenReceived
})