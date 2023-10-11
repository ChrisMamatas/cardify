import "./Widgets.css"
import {Link} from "react-router-dom";

interface Props {
    className?: string
}
export default function PlayWidget({ className } : Props) {

    return (
        <div className={className}>
            <div>
                <Link to={"/battle"}>
                    <button>Battle</button>
                </Link>
            </div>
            <div>
                <Link to={"/arena"}>
                    <button>Arena</button>
                </Link>
            </div>
        </div>

    )
}