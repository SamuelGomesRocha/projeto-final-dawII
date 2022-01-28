import { useEffect } from "react";
import { Coin } from "react-bootstrap-icons";
import { Leilao } from "types/leilao";
import './styles.css'

type Props = {
    leilao: Leilao;
}

function DataLeilaoComponent({leilao}:Props){

    let sColor = '';

        const dt = leilao?.dataExpiracao.split("-");
        let y =  dt?.slice(0, 1);
        let m = dt?.slice(1, 2).toString();
        let d = dt?.slice(2);


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
        console.log("O leilao: "+ sColor)
    

    
    const style = {
        color: sColor,
      };

    return(
            <div className="container-infos">
            
           
            <div className="c-lanceMin">
                <div className="dataexp-teste">
                    <h4 style={{color: 'blue'}}>Data de expiração</h4>
                    <h4 style={{marginBottom: 10}}>{`${d}/${m}/${y}`}</h4>    
                 </div>
                 
                </div>
           
           
            </div>
    );
}


export default DataLeilaoComponent;