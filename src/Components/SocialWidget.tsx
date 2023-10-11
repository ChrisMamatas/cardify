import "./Widgets.css"
import {Link} from "react-router-dom";
interface Props {
    className?: string
}

export default function SocialWidget({ className } : Props) {

    return (
        <Link to={"/Social"}>
            <div className={className}>
                <p>Social</p>
            </div>
        </Link>
    )
}