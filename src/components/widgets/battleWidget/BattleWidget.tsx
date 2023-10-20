import "../../Widgets.css"
import "./BattleWidget.css"
import { Link } from "react-router-dom";

export default function BattleWidget() {

    return (
        <Link to={"/battle"} className={"link"}>
            <div className={"Widget center GradientBattle"}>
                <h1 style={{ color: "black" }}>
                    Battle
                </h1>
            </div>
        </Link>
    )
}
