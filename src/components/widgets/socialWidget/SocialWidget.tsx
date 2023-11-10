import "../../Widgets.css"
// import "./SocialWidget.css"
import { BsPersonAdd } from "react-icons/bs";
import { Image, OverlayTrigger, Popover, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import {SetStateAction, useEffect, useState} from "react";

interface Friend {
    username: string,
    online: boolean,
    profile_picture: string
}

const friends: Friend[] = [
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

    // const [screenSize, setScreenSize] = useState('');
    //
    // useEffect(() => {
    //     function handleResize() {
    //         if (window.innerWidth >= 3200) {
    //             setScreenSize('xl'); //3440 x 1440
    //         } else if(window.innerWidth >= 2500){
    //             setScreenSize('chris') //2560 x 1664
    //         } else if (window.innerWidth >= 1900) {
    //             setScreenSize('lg'); //1920 x 1080
    //         } else if (window.innerWidth >= 1300) {
    //             setScreenSize('md'); //1536 x 864
    //         } else {
    //             setScreenSize('default'); // Set a default class name if no condition is met
    //         }
    //     }
    //
    //     handleResize();
    //
    //     window.addEventListener('resize', handleResize);
    //
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const [currentPopupUsername, setCurrentPopupUsername] = useState<string | null>(null);
    const createPopup = (friend: Friend) => {
        if (currentPopupUsername === friend.username) {
            console.log('Removing popup');
            setCurrentPopupUsername(null);
        } else {
            console.log('Setting current popup username: ', friend.username);
            setCurrentPopupUsername(friend.username);
        }
    };

    return (
        // <div className={`friendsWidget-${screenSize} Widget`}>
        // <div className={`friendsWidget Widget`}>
            <div style={{height: "100%"}}>
            <div className={"header"} style={{backgroundColor:"var(--tertiary)"}}>
                <h5 style={{marginBottom:"0rem"}}>Friends</h5>
                <h5><BsPersonAdd /></h5>
            </div>
            {/*<div className={`friends-${screenSize} overflow-y-scroll friend-list`}>*/}
            <div style={{height: "100%", overflowY: "auto"}} className={`friends friend-list`}>

                {friends.map(friend => (
                    <div onClick={() => createPopup(friend)} key={friend.username}>
                        <OverlayTrigger
                            show={currentPopupUsername === friend.username}
                            trigger="click"
                            key={friend.username}
                            placement={"top"}
                            overlay={
                                <Popover id={`popover-positioned`} style={{ backgroundColor: "#424B54" }} >
                                    <Popover.Body>
                                        <Table striped bordered hover className="social-popup">
                                            <thead>
                                                <tr>
                                                    <th>{friend.username}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <Link className="social-popup" to={"/trading"}>
                                                    <tr>
                                                        <td>Trade</td>
                                                    </tr>
                                                </Link>
                                                <tr>
                                                    <td>Message</td>
                                                </tr>
                                                {/* <tr><td>First Name</td></tr> */}
                                                {/* <tr><td>First Name</td></tr> */}
                                            </tbody>
                                        </Table>
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <div className={"d-flex p-2 m-2 align-items-center friend-item"}>
                                <Image src={friend.profile_picture} height={50} />
                                <div className={"px-2"}>
                                    <p>{friend.username}</p>
                                    <p style={{ fontSize: "0.75em" }}>{friend.online ? "Online" : "Offline"}</p>
                                </div>
                            </div>
                        </OverlayTrigger>
                    </div>
                ))}
            </div>
        </div>

    );
}
