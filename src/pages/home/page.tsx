import { Link } from "atomic-router-react";

import { AboutPage } from "../about";

export const Page = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to={AboutPage.route}>Абаут</Link>
        </div>
    )
};
