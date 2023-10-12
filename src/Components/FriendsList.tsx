
interface FriendProps {
    name: string;
    status: number;
}
function Friend(props: FriendProps) {

    return (
        <>
            <p>{ props.name }</p>
            <p>
                {
                    props.status ? "online" : "offline"
                }
            </p>

        </>

    )
}

const people: {name: string; status: number}[] = [
    {name: 'Joe', status: 0},
    {name: 'Gamer', status: 1},
    {name: 'CardBoy43', status: 1},
    {name: 'MomLover123', status: 0},
    {name: 'OldSkip', status: 1}
];
export default function FriendsList() {

    const friends: JSX.Element[] = people.map((person: object) =>
        <Friend {...person as FriendProps} />
    );

    return (
        <>
            <h3>Friends</h3>
            { friends }

        </>
    )
}