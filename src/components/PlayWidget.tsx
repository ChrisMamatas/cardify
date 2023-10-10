import "./Widgets.css"

interface Props {
    className?: string
}
export default function PlayWidget({ className } : Props) {

    return (
        <div className={className}>
            <div>
                <p>Play 1</p>
            </div>
            <div>
                <p>Play 2</p>
            </div>
        </div>

    )
}