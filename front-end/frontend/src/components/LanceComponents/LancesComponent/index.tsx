import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Lance } from 'types/lance';
import { Leilao } from 'types/leilao';
import { Usuario } from 'types/usuario';
import { URL_LANCE, URL_LEILAO } from 'utils/requests';
import LanceCard from '../LanceCard';
import './styles.css'


type Props = {
    idLeilao:string;
}


function LancesComponent({idLeilao} : Props){

//#ADD8E6;

    const params = useParams();

    const [verify, setVerify] = useState(true);
    const [lances, setLance] = useState<Lance[]>();
    const [winner, setWinner] = useState<Usuario>();
    const [verifyWin, setVerifyWin] = useState(false);

       useEffect(() => {
           axios.get(`${URL_LANCE}/get/${idLeilao}`).then(resp => {
               const data = resp.data as Lance[];
               setLance(data);

               data.map(l =>{
                   console.log("id"+l.id.idUser.iconUser)
               })

           })

           
        axios.get(`${URL_LANCE}/winner/${idLeilao}`).then(resp =>{
            setWinner(resp.data as Usuario);
        }
        )
       }, [])

     

       useEffect(() => { 
        axios.get(`${URL_LEILAO}/${idLeilao}`).then(resp => {
           const leilas = resp.data as Leilao;
            if(leilas.status == "EXPIRADO" || leilas.status == "FINALIZADO"){
               setVerify(false);
           } else {
               setVerify(true)
           }   
       })

          
       }, )
       


const handleSubmit = (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

      

        const valor = (event.target as any).valor.value;
      

        const config: AxiosRequestConfig = {
            baseURL: URL_LANCE,
            method: 'PUT',
            url: '/novoLance',
            data: {
                idLeilao: idLeilao,
                idUser: sessionStorage.getItem('idUseraaa'),
                valorLance: valor
            }     
        }

        axios(config).then(response => {
            console.log(response.data)
            window.location.reload();
        });

      
    }



/*
    return(
        <div className="content-body-app">
           <div className='cmp-lances'>
               <div className='llances-content'>

            {lances?.map(l => {
                    {console.log("Teste: "+ l.id.idLeilao.item)}
                    <div className='lanceiro'>
                        <LanceCard lance={l} />
                   </div>  

            })
            }

                                   
               </div>
               <h3> Lances </h3>
           </div>
        </div>
    );
*/

            return( 
                <div className='content-body-app' style={{marginTop: 110}}>
                <div className="form-group dsmovie-form-group" style={{marginTop: 0}}>
                    
                 <form className="dsmovie-form" onSubmit={handleSubmit} style={{marginTop: -70, marginBottom:200, marginLeft:10}}>
                   {verify && (<> <label htmlFor="valor">Informe o valor do lance</label>
                    <input type="valor" style={{marginBottom: -100}} className="form-control" id="valor"/>
                    <input type="submit" value="Submit" style={{
                        backgroundColor: 'transparent',
                        backgroundRepeat:'no-repeat',
                        border: 'none',
                        overflow: 'hidden',
                        outline:'none',
                        color: 'transparent'
                        }}/></>  )} 
                        {!verify && (
                        <div style={{
                            backgroundColor: 'lightgrey',
                            marginTop: 10,
                            borderRadius: 100
                        }}>
                            <h3 style={{
                                color:'dodgerblue',
                                fontFamily: 'open-sans',
                                fontSize:30,
                                marginTop: 0,
                                marginLeft: -7,
                                fontWeight: 700,
                                backgroundColor: 'lig'}}> <img style={{
                                        width: 40,
                                        borderRadius: 100,
                                        height: 30,
                                        marginTop: -8
                                }}src={winner?.iconUser}></img> {winner?.userName} ganhou!</h3>
                        </div>
                        )}
                    </form>
                    
                 </div>   
                 <Scrollbar style={{ width: 500, height: 400}}>
                    <div className="container"  style={{marginTop: -110, marginLeft: -173.5}}>
                
            
                    <div className="row">
                          
                          {lances?.map(l => (
                             <div key={l.key} className="row-sm-6 row-lg-4 row-xl-3" style={{ marginTop: -90}}>
                                 
                             <LanceCard lance={l}/>
                           </div>
                          )
                          )}          
                                
                 </div>
                 </div>
             </Scrollbar>
             </div>
            );

}

export default LancesComponent;