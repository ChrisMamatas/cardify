import "../../Widgets.css"
import "./ArenaWidget.css"
import { Link } from "react-router-dom";

export default function ArenaWidget() {

    return (
        <Link to={"/ArenaSelector"} className={"link"}>
            <div className={"Widget center GradientArena"}>
                <h1>Arena</h1>
            </div>
        </Link>
    )
}
