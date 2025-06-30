import {Outlet, Link} from "react-router-dom";

function Root () {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/favorites'>Favorites</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
};

export default Root;