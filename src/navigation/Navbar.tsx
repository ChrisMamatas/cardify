import { Link} from "react-router-dom";

export default function Navbar() {

    return (
        <nav className={"nav"}>
            <Link to={"/"} className={"title"}>Cardify</Link>
            <ul>
                <li>
                    <Link to={"/play"}>Play</Link>
                </li>
                <li>
                    <Link to={"/friends"}>Friends</Link>
                </li>
                <li>
                    <Link to={"/settings"}>Settings</Link>
                </li>
            </ul>
        </nav>
    )
}