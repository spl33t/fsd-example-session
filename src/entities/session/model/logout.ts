import { createEvent, sample } from "effector";
import { not } from "patronum";

import { $isAuthorized, tokenErased } from "shared/token";
import { routes } from "shared/routes/routes";

export const clickLogoutButton = createEvent<any>()

sample({
    clock: clickLogoutButton,
    target: tokenErased
})

sample({
    clock: $isAuthorized,
    filter: not($isAuthorized),
    target: routes.login.open
})
