import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import "./Widgets.css"
import "./SocialWidget.css"

interface Friends {
    username: string,
    online: boolean,
    profile_picture: string
}

const friends: Friends[] = [
    {
        username: "user1",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user2",
        online: false,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user3",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user4",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user5",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user6",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user7",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user8",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user9",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        username: "user10",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },{
        username: "user11",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },{
        username: "user12",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },{
        username: "user13",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },




]

export default function SocialWidget() {

    return (
        <Link to={"/Social"} className={"link"}>
            <div className={"Widget"}>
                <div className={"d-flex justify-content-between"}>
                    <p>Friends</p>
                    <p>+</p>
                </div>
                <div style={{ height: "30rem", overflowY: 'auto'}}>
                    <div>
                        {friends.map((friend) => (
                            <div className={"d-flex"} key={friend.username} style={{border: '1px solid rgba(0, 0, 0, 0.05)'}}>
                                <Image src={friend.profile_picture} height={50}/>
                                <div>
                                    <p>{friend.username}</p>
                                    <p>{friend.online ? "Online" : "Offline"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Link>
    )
}