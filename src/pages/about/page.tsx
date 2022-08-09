import { Link } from "atomic-router-react";

import { routes } from "shared/routes";

export const AboutPage = () => {
    return (
        <div>
            <h1>About</h1>
            <Link to={routes.home}>Home</Link>
        </div>
    )
};
