import { Link } from 'react-router-dom'
import './Temp.css'

interface Props {
    className?: string
}
export default function Temp({ className }: Props) {

    return (
        <div className={className}>
            <Link to={"/Trading"}>
                <p>Trade</p>
            </Link>
        </div>
    )
}