
interface UserData {
    uid: String,
    username: String
    elo: Number
    profilePicture: String
}

interface Profile {
    uid: string;
    username: string;
    elo: number;
    profilePicture: string;
    bestCards: BestCards;
    recentBattles: RecentBattle[];
}


interface BestCards {
    bestAttack: Card;
    bestDefense: Card;
    bestHealth: Card;
}

interface RecentBattle {
    opponentUserName: string;
    opponentProfilePic: string;
    win: boolean;
    date: string;
}

