import { combine, createEvent, createStore, sample } from "effector";

import { signInFx } from "entities/session";
import { createRoute } from "atomic-router";

export const currentRoute = createRoute()

export const changeInputLogin = createEvent<string>()
export const changeInputPassword = createEvent<string>()
export const submitForm = createEvent()

export const $login = createStore<string>('')
export const $password = createStore<string>('')

$login.on(changeInputLogin, (state, payload) => payload)
$password.on(changeInputPassword, (state, payload) => payload)

const $form = combine({$login, $password})

sample({
    clock: submitForm,
    source: $form,
    fn: (s) => {
        return {
            login: s.$login,
            password: s.$password
        }
    },
    target: signInFx
})