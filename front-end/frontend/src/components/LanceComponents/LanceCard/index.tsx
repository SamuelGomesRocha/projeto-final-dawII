import { Coin } from "react-bootstrap-icons";
import { Lance } from "types/lance";
import './styles.css'

type Props = {
    lance : Lance;
}

function LanceCard({lance} : Props){


    const user = lance?.id.idUser;
    console.log("testuser: "+user.email)

    return (
        <div className="card-lance">
            <div className="user-part">
                <img className="user-part-card-img" src={user.iconUser} alt={user.userName} />
                <h2>{user.userName}</h2>
            </div>
            <div className="lance-part">
                <Coin className="moeda"/>
                <h2>{lance.valorLance}</h2>
            </div>
        </div>
    );

}

export default LanceCard;