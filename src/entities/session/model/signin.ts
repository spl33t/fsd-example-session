import { createEffect, sample } from "effector";

import { loginApi } from "shared/api";
import { tokenReceived } from "shared/token";

export const signInFx = createEffect(loginApi)
export const loginPending = signInFx.pending

sample({
    clock: signInFx.doneData.map(s => s?.token),
    target: tokenReceived
})