import AltLeilaoCard from 'components/AltLeilaoCard/Index';
import { useParams } from 'react-router-dom';



function AltLeilao(){

    const params = useParams();
    console.log("Olhe o console.log: "+params.leilaoId)
    return(
       <AltLeilaoCard idLeilao={`${params.leilaoId}`}/>
    );
}

export default AltLeilao;  