import { Link } from 'react-router-dom'
import './Temp.css'

export default function Temp() {

    return (
        <Link to={"/Trading"} className={"link"}>
            <div className={"Widget center"}>
                <h1>Trade</h1>
            </div>
        </Link>
    )
}