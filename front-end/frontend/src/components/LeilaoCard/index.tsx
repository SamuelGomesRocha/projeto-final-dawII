import axios from "axios";
import StatusComponent from "components/StatusComponent";
import { useEffect, useState } from "react";

import { Coin, PencilFill, TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Leilao } from "types/leilao";
import { Usuario } from "types/usuario";
import { URL_LEILAO } from "utils/requests";
import './styles.css'

type Props = {
    leilao: Leilao;
    user: Usuario
}

function LeilaoCard( {leilao, user} : Props){

    let sColor = '';
    const [present, setPresent] = useState("");
    const [verify, setVerify] = useState(false);


    const hover = () =>{
        setVerify(true);
    }

    const out = () => {
        setVerify(false);
    }

   useEffect(() =>{
    if(verify == false){
        setPresent(leilao.item)
 
    }else{
        setPresent(leilao.lanceMinimo.toString());

    }

   })

   if(leilao.status === 'INATIVO'){
    sColor = 'blue';
    }
    if(leilao.status === 'ABERTO'){
        sColor='green';
    }
    if(leilao.status === 'EXPIRADO'){
        sColor='yellow';
    }
    if(leilao.status === 'FINALIZADO'){
        sColor='red'; 
    } 
  
    const handleDelete = () =>{
        axios.get(`${URL_LEILAO}/delete/${leilao.idLeilao}`).then(response => {
            window.location.reload()
        }
        )
    }

    
     console.log("take the status: "+leilao.status)

     const style = {
        color: sColor,
        fontSize: 10,
        marginRight: 40,
        marginTop: 5,
        font: "Open sans",
        fontWeight: 800
      };

    console.log("O status l: "+ leilao.item)
    return(
       
        <div className="container-leilaocard" onMouseOver={hover} onMouseOut={out}>
        <Link to={`/lance/${leilao.idLeilao}`}>
        <img className="dsmovie-movie-card-image" src={leilao.urlIcon} alt={leilao.item} />
       </Link> 
       <div className="btn-lances"> {verify && (
           <div style={{display: "flex"}}> 
            <h4  style={style}>{leilao.status}</h4> 
            <Coin className="c-min-c" style={{visibility: "visible", marginTop: 4}}/>
            </div>
       )}
          
       {present}</div>   
        <div className="dsmovie-card-bottom-container">
                 
            <div className="new-test">
            <StatusComponent leilao={leilao}/>
           </div>
            <div className="container-buttons-lance">
                <div className="btn-delete" onClick={handleDelete}><TrashFill/></div>
                 <Link to={`/AltLeilao/${leilao.idLeilao}`} style={{ textDecorationLine: "none"}}>
                     <div className="btn-edit"><PencilFill/></div> 
                     </Link>    
            </div>       
        </div>
    </div>
   
    
    );
}


export default LeilaoCard;