import ProfileWidget from "../components/ProfileWidget.tsx";
import PlayWidget from "../components/PlayWidget.tsx";
import "./Home.css"
import FriendsWidget from "../components/FriendsWidget.tsx";
import DeckWidget from "../components/DeckWidget.tsx";
import Temp from "../components/Temp.tsx";

export default function Home() {

    return (
        // <div>
        //     <h1>
        //         Home
        //     </h1>
        //     <div>
        //         <button>
        //             <Link to={"/Social"}>Social</Link>
        //         </button>
        //     </div>
        //     <div>
        //         <button>
        //             <Link to={"/Cards"}>Cards</Link>
        //         </button>
        //     </div>
        //     <div>
        //         <button>
        //             <Link to={"/Battle"}>Battle</Link>
        //         </button>
        //     </div>
        //     <div>
        //         <button>
        //             <Link to={"/Arena"}>Arena</Link>
        //         </button>
        //     </div>
        // </div>

        <div className={"center-container"}>
            <div className={"grid-container"}>

                <ProfileWidget className={"Widget top-row"} />
                <DeckWidget className={"Widget top-row"} />
                <PlayWidget className={"Widget top-row"} />
                <FriendsWidget className={"Widget span-two-rows bottom-row"} />
                <Temp className={"Widget span-two-rows-and-columns bottom-row"} />
            </div>
        </div>
    )
}
