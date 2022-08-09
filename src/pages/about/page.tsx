import { Link } from "atomic-router-react";

import {HomePage } from "../home";

export const Page = () => {
    return (
        <div>
            <h1>About</h1>
            <Link to={HomePage.route}>Home</Link>
        </div>
    )
};
