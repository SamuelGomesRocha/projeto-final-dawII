import axios from "axios";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Usuario } from "types/usuario";
import { URL_USER } from "utils/requests";
import './styles.css'


type Props = {
    user: Usuario;
} 

function UserCard( {user} : Props){

    const handleDelete =  () =>{
        axios.get(`${URL_USER}/delete/${user.idUser}`).then(resp => {
            window.location.reload();
        })
    }
 

    return(
        <div className="container-leilaocard">
        
       
        <div className="dsmovie-card-bottom-containero">
            
       
                    <img className="dsmovie-movie-card-image" src={user.iconUser} alt={user.userName} />
                
            <div className="btn-lancesa">{user.userName}</div>    
            <div className="info-user">
             {user.email}
           </div> 
        
            <div className="test-buttons-4">
                <div className="btn-delete" onClick={handleDelete}><TrashFill/></div>
                    {console.log(`id usuário = ${user.idUser}`)}
            <Link to = {`/altUser/${user.idUser}`} style={{ textDecorationLine: "none"}}>

                <div className="btn-edit"><PencilFill/></div> 
                </Link>
            </div>       

        </div>
     
    </div>
    );
}

export default UserCard;