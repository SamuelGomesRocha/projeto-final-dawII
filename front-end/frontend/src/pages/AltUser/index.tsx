import AltUserCard from "components/AltUserCard";
import { useParams } from "react-router-dom";

function AltUser(){
    
    const params = useParams();
    console.log("Look at the console: "+params.userId)

    return(
        
            <AltUserCard idUser= { `${params.userId}` } />    
        
    );
}

export default AltUser;