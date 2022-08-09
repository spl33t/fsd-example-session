import { useUnit } from "effector-react";
import { Link } from "atomic-router-react";

import { $login } from "entities/session";
import { routes } from "shared/routes";

const currentRoute = routes.about

export const AboutPage = () => {
    const login = useUnit($login)
    return (
        <div>
            About
            <br/>
            login {login}
            <br/>
            <Link to={routes.home}>Home</Link>
        </div>
    )
};
