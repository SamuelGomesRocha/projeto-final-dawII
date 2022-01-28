import axios from "axios";
import LeilaoCard from "components/LeilaoCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Leilao } from "types/leilao";
import { Usuario } from "types/usuario";
import { URL_LEILAO, URL_USER } from "utils/requests";
import './styles.css'


function Leiloes(){

    

   const [page, setPage] = useState<Leilao[]>();
   const [usuario, setUsuario] = useState<Usuario>();
   const params = useParams<string>();
    console.log("Os parametros: "+ sessionStorage.getItem('idUseraaa'));

   useEffect(() => {
      axios.get(`${URL_LEILAO}/list`).then(response =>{
         const data = response.data as Leilao[];
         setPage(data);
         data.map(l => {
             {console.log("time to status: "+l.status)}
         })
         
      })

      axios.get(`${URL_USER}/68`).then(resp => {
          console.log("Cara, o usurio: "+(resp.data as Usuario).userName)
        setUsuario(resp.data as Usuario);
      })


   }, [])

 

    return (
         
        <div className="container">
            
               <div className="row">
                     
                     {page?.map(leilao => (
                        <div key={leilao.idLeilao} className="col-sm-6 col-lg-4 col-xl-3">
                        
                        <LeilaoCard leilao={leilao} user={usuario as Usuario}/>
                      </div>
                     )
                     )}          
                           
            </div>
        </div>
        
    );
}

export default Leiloes;