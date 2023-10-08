import "./Widgets.css"
interface Props {
    className?: string
}

export default function FriendsWidget({ className } : Props) {

    return (
        <div className={className}>
            <p>Friends</p>
        </div>
    )
}