import {Link} from "react-router-dom";

export default function Home() {

    return (
        <div>
            <h1>
                Home
            </h1>
            <div>
                <button>
                    <Link to={"/Social"}>Social</Link>
                </button>
            </div>
            <div>
                <button>
                    <Link to={"/Cards"}>Cards</Link>
                </button>
            </div>
            <div>
                <button>
                    <Link to={"/Battle"}>Battle</Link>
                </button>
            </div>
            <div>
                <button>
                    <Link to={"/Arena"}>Arena</Link>
                </button>
            </div>
        </div>
    )
}
