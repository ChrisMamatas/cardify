import { Link, Route, Routes } from "react-router-dom"
import "./Widgets.css"
import CreateCard from "../pages/CreateCard"

export default function DeckWidget() {

    return (
        <Link to={"/Cards"} className={"link"}>
            <div className={"Widget center"} >
                <h1>Deck</h1>
            </div>

            <Routes>
                <Route path={"/CreateCard"} element={<CreateCard />} />
            </Routes>
        </Link>

    )
}