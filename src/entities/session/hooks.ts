import { createEvent, guard, Event, Store, Effect } from "effector";

import { $isAuthorized } from "shared/token";

export function filterAuthenticated<T>(
    source: Event<T> | Store<T> | Effect<T, any, any>,
): Event<T> {
    const target = createEvent<T>();

    guard({
        source,
        filter: $isAuthorized,
        target,
    });

    return target;
}

export function filterAnonymous<T>(source: Event<T> | Store<T> | Effect<T, any, any>): Event<T> {
    const target = createEvent<T>();

    guard({
        source,
        filter: $isAuthorized.map((is) => !is),
        target,
    });

    return target;
}