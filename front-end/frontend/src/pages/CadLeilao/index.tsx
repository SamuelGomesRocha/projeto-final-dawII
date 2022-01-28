import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL_LEILAO } from 'utils/requests';
import './styles.css'


function CadLeilao(){

    const navigate = useNavigate();


    const handleSubmit = (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const item = (event.target as any).item.value;
        const lanceMinimo = (event.target as any).lanceMin.value;
        const status = (event.target as any).status.value;
        const dataExpiracao = (event.target as any).dataExp.value;
        const urlIcon = (event.target as any).urlIcon.value;

        const config: AxiosRequestConfig = {
            baseURL: URL_LEILAO,
            method: 'POST',
            url: '/create',
            data: {
                item: item,
                lanceMinimo: lanceMinimo,
                status: status,
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
        <div className="leiloes-form-container">
    <div className="leiloes-card-buttom-container">
        <h3 className='h3special'>Cadastro de leilões</h3>
        <form className="leiloes-form" onSubmit={handleSubmit}>
            <div className="form-group leiloes-form-group">
                <label htmlFor="item">Informe o nome do item</label>
                <input type="item" className="form-control" id="item" />
            </div>
            <div className="form-group leiloes-form-group">
                <label htmlFor="status">Status do leilão</label>
                <select className="form-control" id="status">
                    <option>INATIVO</option>
                    <option>ABERTO</option>
                    <option>EXPIRADO</option>
                    <option>FINALIZADO</option>
                </select>
            </div>
            <div className="form-group leiloes-form-group">
                <label htmlFor="valorIni">Informe o valor do item</label>
                <input type="valorIni" className="form-control" id="lanceMin" />
            </div>
            <div className="form-group leiloes-form-group">
                <label htmlFor="dataExp"> Data de expiração </label>
                <input type="dataExp" className="form-control" id="dataExp" />
            </div>
            <div className="form-group leiloes-form-group">
                <label htmlFor="dataExp"> URL Icon </label>
                <input type="urlIcon" className="form-control" id="urlIcon" />
            </div>
            <div className="leiloes-form-btn-container">
                <button type="submit" className="btn btn-primary leiloes-btn">Salvar</button>
            </div>
        </form >
    </div >
</div >
    );
}

export default CadLeilao;  