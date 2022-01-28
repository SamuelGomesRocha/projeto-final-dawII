import LancesComponent from "components/LanceComponents/LancesComponent";
import LanceLeilaoComponent from "components/LanceComponents/Leilao";
import { useParams } from "react-router-dom";
import './styles.css';

function Lance(){
    const params = useParams();

    return (

        <div className="llprjct-container">
                <div className="llprjct-lleilao">
                     <LanceLeilaoComponent idLeilao={`${params.idLeilao}`} />
                </div>
               
               <div className="llprjct-llance">
                   <LancesComponent idLeilao={`${params.idLeilao}`}/>
               </div>
                
        </div>
    );
}

export default Lance;