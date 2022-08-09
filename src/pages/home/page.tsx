import { Link } from "atomic-router-react";

import { routes } from "shared/routes";


export const HomePage = () => {
    return (
        <div>
            HomePage
            <br/>
            <Link to={routes.about}>Абаут</Link>
        </div>
    )
};
