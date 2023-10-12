import "./Widgets.css"
import {Link} from "react-router-dom";

export default function PlayWidget() {

    return (
        <Link to={"/battle"} className={"link"}>
            <div className={"Widget center"}>
                <h1>
                    Play
                </h1>
            </div>
        </Link>
    )
}
