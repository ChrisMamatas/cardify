import { Link} from "react-router-dom";

export default function Navbar() {

    return (
        <nav className={"nav"}>
            <Link to={"/"} className={"title"}>Cardify</Link>
            <ul>
                <li>
                    <Link to={"/profile"}>Profile</Link>
                </li>
            </ul>
        </nav>
    )
}