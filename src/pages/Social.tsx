import react from "@vitejs/plugin-react-swc";
import React, {useState} from "react";

/*interface friendProp{
    Name: String;
    id: number;
    Level: number;
    Status: Boolean;
    handleAdd:(e: React.FormEvent) => void;
}*/
export default function Social() {
    /*const [friend, setListFriend] = useState<string>("")
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const friend:React.FC<friendProp> =({friend, setListFriend, handleAdd}) => {*/

        return (
            <div>
                <div style={{padding: "2%"}}/>

                <div>
                    <button style={{position: "sticky", width: "90%", left: "5%", top: "5%"}}>
                        Add Friend
                    </button>
                </div>

                <div>

                </div>
            </div>
        )

}
