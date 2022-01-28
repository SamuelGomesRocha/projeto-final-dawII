import axios from "axios";
import { useEffect, useState } from "react";
import { Coin } from "react-bootstrap-icons";
import { Leilao } from "types/leilao";
import { URL_LEILAO } from "utils/requests";
import './styles.css'



type Props = {
    idLeilao: string; 
}

function LanceLeilaoComponent({idLeilao} : Props){

    const[leilao,  setLeilao] = useState<Leilao>();
    const[verify, setVerify] = useState(true);



    useEffect(() => {
          axios.get(`${URL_LEILAO}/${idLeilao}`).then(resp => {
            const l = resp.data as Leilao;
            setLeilao(l);
            if(l.status == "FINALIZADO" || l.status == "EXPIRADO"){
                setVerify(false)
            }
          })
    }, [idLeilao])

    console.log("exp: "+leilao?.dataExpiracao)

    const[tDays, setDays] = useState('00');
    const[tHours, setHours] = useState('00');
    const[tMinutes, setMinutes] = useState('00');
    const[tSeconds, setSeconds] = useState('00');

    let a = '';

    const dt = leilao?.dataExpiracao.split("-");
    let y =  dt?.slice(0, 1);
    let m = dt?.slice(1, 2).toString();
    let d = dt?.slice(2);

    if(m != null){
        a = m;
    }

    let trueMonth = '';

    switch(a){
        case  '01':
            trueMonth = 'jan';
            break;
            case  '02':
            trueMonth = 'feb';
            break;
            case  '03':
            trueMonth = 'mar';
            break;
            case  '04':
            trueMonth = 'apr';
            break;
            case  '05':
            trueMonth = 'may';
            break;
            case  '06':
            trueMonth = 'jun';
            break;
            case '07':
            trueMonth = 'jul';
            break;
            case  '08':
            trueMonth = 'aug';
            break;
            case  '09':
            trueMonth = 'sep';
            break;
            case '10':
            trueMonth = 'oct';
            break;
            case '11':
            trueMonth = 'nov';
            break;
            case '12':
            trueMonth = 'dec';
            break;   
    }
    console.log("true:"+ trueMonth)

    const timerStarter = () => {
       
        const countDownDate = new Date(`${trueMonth} ${d}, ${y} 00:00:00`).getTime();

        console.log(countDownDate)
       let interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            

            const days = Math.floor(distance / (1000*60*60*24));
            const hours = Math.floor(distance % (1000*60*60*24) / (1000*60*60));
            const minutes = Math.floor(distance % (1000*60*60)/ (1000*60));
            const seconds = Math.floor(distance % (1000*60) / 1000);

            if(distance < 0){
                clearInterval(interval)
            }else{
               
            if(seconds.toString() !== 'NaN'){
                setDays(days.toString());
                setHours(hours.toString());
                setMinutes(minutes.toString());
                setSeconds(seconds.toString())
            }else{
                setDays('');
                setHours('');
                setMinutes('');
                setSeconds('');
            }
        }
        }, 1000)
    }



    useEffect(() =>{
        timerStarter();
        return () => {
           // clearInterval(interval)
        }
    },)


    return (
        
        <div className="container-leilaocardo">
        <img className="dsmovie-movie-card-imag" src={leilao?.urlIcon} alt={leilao?.item} />
       <div className="btn-lancers">{leilao?.item}</div>   

        <div className="dsmovie-card-bottom-containera">
                 



         
           
            <div className="container-buttons-lancer">
            <div className="info-leilaor">
                <div className="info-title">Lance mínimo atual</div>
                <Coin />
                <div className="info-money">R${leilao?.lanceMinimo} </div>                  
            </div>
            <div className="timer-describe">
            <div className="info-timet">Tempo restante</div> 
            {verify && (
                   <div className="timing">
                <div>{tDays}:</div>
                <div>{tHours}:</div>
                <div>{tMinutes}: {console.log(trueMonth)}</div>
                <div>{tSeconds}</div>
            </div>
            )} {!verify && (
                <div className="timing"><h4 style={{
                    color:'blue',
                    fontFamily: 'open-sans',
                    fontSize:14,
                    marginTop:10,
                    marginLeft: -5,
                    fontWeight: 700
                }}>Leilão finalizado!</h4></div>
            )}
         
                
             </div>

            </div>       
        </div>
    </div>

        );
}



export default LanceLeilaoComponent;