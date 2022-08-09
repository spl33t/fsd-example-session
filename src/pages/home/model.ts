import { createRoute } from "atomic-router";

export const currentRoute = createRoute()

currentRoute.$isOpened.watch(state => {
    console.log(state)
})