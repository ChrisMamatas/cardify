import { Link, Route, Routes } from "react-router-dom"
import "./Widgets.css"
import CreateCard from "../pages/CreateCard"

interface Props {
    className?: string
}
export default function DeckWidget({ className }: Props) {

    return (
        <div>
            <Link to={"/Cards"}>
                <div className={className} >
                    <p>Deck</p>
                </div>
            </Link>
            <Routes>
                <Route path={"/CreateCard"} element={<CreateCard />} />
            </Routes>
        </div>
    )
}