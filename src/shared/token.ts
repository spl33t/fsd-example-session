import { createEvent, createStore, sample } from "effector"
import { persist } from "effector-storage/local"

export const tokenReceived = createEvent<any>()
export const tokenErased = createEvent()

const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"

export const $token = createStore(localStorage.getItem(ACCESS_TOKEN) || null)

export const $isAuthorized = $token.map(Boolean)

$token
    .on(tokenReceived, (prev, token) => token)
    .reset(tokenErased)


sample({
    clock: tokenReceived,
    filter: Boolean,
    fn: (token) => localStorage.setItem(ACCESS_TOKEN, token)
})

sample({
    clock: tokenErased,
    fn: () => localStorage.removeItem(ACCESS_TOKEN)
})
