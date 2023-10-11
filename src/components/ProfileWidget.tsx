import { Link } from "react-router-dom";
import './Widgets.css'
interface Props {
    className?: string
}
export default function ProfileWidget({ className } : Props) {

    return (
        <Link to={"/Profile"}>
            <div className={className}>
                Profile
            </div>
        </Link>
    )
}