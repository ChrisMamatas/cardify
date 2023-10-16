import "./Widgets.css"
import "./SocialWidget.css"
import { BsPersonAdd } from "react-icons/bs";
import { Image, OverlayTrigger, Popover } from "react-bootstrap"

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
    }, {
        username: "user11",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }, {
        username: "user12",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }, {
        username: "user13",
        online: true,
        profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
]

export default function SocialWidget() {

    return (
        <div className={"Widget"}>
            <div className={"header"}>
                <h5>Friends</h5>
                <h5><BsPersonAdd /></h5>
            </div>
            <div className={"overflow-y-auto"} style={{ height: "30rem" }}>
                {friends.map((friend) => (
                    <OverlayTrigger
                        trigger="click"
                        key={friend.username}
                        placement={"top"}
                        overlay={
                            <Popover id={`popover-positioned`}>
                                <Popover.Header as="h3">{`Popover`}</Popover.Header>
                                <Popover.Body>
                                    <strong>Holy guacamole!</strong> Check this info.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <div className={"d-flex p-2 align-items-center friend-item"}>
                            <Image src={friend.profile_picture} height={50} />
                            <div className={"px-2"}>
                                <p>{friend.username}</p>
                                <p style={{ fontSize: "0.75em" }}>{friend.online ? "Online" : "Offline"}</p>
                            </div>
                        </div>
                    </OverlayTrigger>
                ))}
            </div>
        </div>
    )
}