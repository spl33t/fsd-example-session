import { createEffect, sample } from "effector";

import { loginApi } from "shared/api";
import { tokenReceived } from "shared/token";
import { routes } from "../../../shared/routes/routes";

export const signInFx = createEffect(loginApi)
export const loginPending = signInFx.pending

sample({
    clock: signInFx.doneData.map(s => s?.token),
    target: tokenReceived
})

//редирект на хом пейдж после успешной авторизации
sample({
    clock: signInFx.done,
    target: routes.home.open
})