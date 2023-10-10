import { Link } from "react-router-dom"
import "./Widgets.css"

interface Props {
    className?: string
}
export default function DeckWidget({ className }: Props) {

    return (
        <Link to={"/Cards"}>
            <div className={className} >
                <p>Deck</p>
            </div>
        </Link>
    )
}