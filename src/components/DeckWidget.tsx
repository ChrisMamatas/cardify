import "./Widgets.css"

interface Props {
    className?: string
}
export default function DeckWidget({ className } : Props) {

    return (
        <div className={className} id={"deck"}>
            <p>Deck</p>
        </div>
    )
}