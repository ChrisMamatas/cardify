import { Link, Route, Routes } from "react-router-dom"
import "./Widgets.css"
import CreateCard from "../pages/CreateCard"

interface Props {
    className?: string
}
export default function DeckWidget({ className }: Props) {

    return (
<<<<<<< HEAD
        <Link to={"/Cards"}>
            <div className={className}>
                <p>Deck</p>
            </div>
        </Link>
=======
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
>>>>>>> b7c7cdcde62f9e7867c8e7894390b06ce3f9b0b8
    )
}