import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leilao } from 'types/leilao';
import { URL_LEILAO } from 'utils/requests';
import './styles.css'

type Props = {
    idLeilao: string;
}

function AltLeilaoCard({idLeilao} : Props){

    const navigate = useNavigate();

    const [leilao, setLeilao] = useState<Leilao>();

    useEffect(() => {
        axios.get(`${URL_LEILAO}/${idLeilao}`)
        .then(response => { 
            const leilas = response.data as Leilao
            setLeilao(leilas)
        });
    }, [idLeilao]);

 

    const handleSubmit = (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const item = (event.target as any).item.value;
        const lanceMinimo = (event.target as any).lanceMin.value;
        const status = (event.target as any).status.value;
        const dataExpiracao = (event.target as any).dataExp.value;
        const urlIcon = (event.target as any).urlIcon.value;
        console.log("o status: "+status)
        let uou = 0;

        switch(status){
            case "INATIVO":
                uou = 0;
                break;
                case "ABERTO":
                    uou = 1;
                    break;
                    case "EXPIRADO":
                        uou = 3;
                        break;
                        case "FINALIZADO":
                            uou = 2;
                            break;

        }

        const config: AxiosRequestConfig = {
            baseURL: URL_LEILAO,
            method: 'PUT',
            url: '/update',
            data: {
                idLeilao: idLeilao,
                item: item,
                lanceMinimo: lanceMinimo,
                status: uou,
                dataExpiracao: dataExpiracao,
                urlIcon: urlIcon
            }     
        }

        axios(config).then(response => {
            console.log(response.data)
            navigate("/list");
        });
    }


    return(
        <div className="dsmovie-form-container">
    <img className="dsmovie-movie-card-imagea" src={leilao?.urlIcon} alt={leilao?.item}/>
    <div className="dsmovie-card-bottom-container">
        <h3>{leilao?.item}</h3>
        <form className="dsmovie-form" onSubmit={handleSubmit}>
            <div className="form-group dsmovie-form-group">
                <label htmlFor="item">Informe o nome do item</label>
                <input type="item" className="form-control" id="item" defaultValue={leilao?.item}/>
            </div>
            <div className="form-group dsmovie-form-group">
                <label htmlFor="status">Status do leilão</label>
                <select className="form-control" id="status">
                    <option >INATIVO</option>
                    <option>ABERTO</option>
                    <option>EXPIRADO</option>
                    <option>FINALIZADO</option>
                </select>
            </div>
            <div className="form-group dsmovie-form-group">
                <label htmlFor="valorIni">Informe o valor do item</label>
                <input type="valorIni" className="form-control" id="lanceMin" defaultValue={leilao?.lanceMinimo}/>
            </div>
            <div className="form-group dsmovie-form-group">
                <label htmlFor="dataExp"> Data de expiração </label>
                <input type="dataExp" className="form-control" id="dataExp"  defaultValue={leilao?.dataExpiracao}/>
            </div>
            <div className="form-group leiloes-form-group">
                <label htmlFor="dataExp"> URL Icon </label>
                <input type="urlIcon" className="form-control" id="urlIcon"  defaultValue={leilao?.urlIcon}/>
            </div>
            <div className="dsmovie-form-btn-container">
                <button style={{marginLeft: -9}} type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
            </div>
        </form >
    </div >
</div >
    );
}

export default AltLeilaoCard;  