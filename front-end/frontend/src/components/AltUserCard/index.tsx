import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "types/usuario";
import { URL_USER } from "utils/requests";


type Props = {
    idUser: string;
}

function AltUserCard({idUser} : Props){

    console.log("Testando o idUser: "+idUser)

    const navigate = useNavigate();

    const [user, setUser] = useState<Usuario>();

    useEffect(() => {
        axios.get(`${URL_USER}/${idUser}`)
        .then(resp => {
            const user = resp.data as Usuario;
            setUser(user);
        })
    }, [idUser]);


    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const nome = (event.target as any).nome.value;
        const cpf = (event.target as any).cpf.value;
        const iconUser = (event.target as any).iconUser.value;
        const email = (event.target as any).email1.value;
        const userName = (event.target as any).userName.value;
        const password = (event.target as any).password1.value;


        const config: AxiosRequestConfig = {
            baseURL: URL_USER,
            method: 'POST',
            url: '/update',
            data: {
                idUser: idUser,
                cpf: cpf,
                nome: nome,
                email: email,
                iconUser: iconUser,
                userName: userName,
                password: password
            }
        }

        axios(config).then(response => {
            console.log(`Enviando user: ${response.data}`)
            navigate('/users');
        })
    }

    return(
        <div className="leiloes-form-container">
              <img className="dsmovie-movie-card-imagea" src={user?.iconUser} alt={user?.userName}/>
        <div className="leiloes-card-buttom-container">
            <h3 className='h3special'>Alteração de usuário</h3>
            <form className="leiloes-form" onSubmit={handleSubmit}>
                <div className="form-group leiloes-form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="nome" className="form-control" id="nome" defaultValue={user?.nome}/>
                </div>
                <div className="form-group leiloes-form-group">
                    <label htmlFor="cpf">cpf</label>
                    <input type="cpf" className="form-control" id="cpf" defaultValue={user?.cpf}/>
                </div>
                <div className="form-group leiloes-form-group">
                    <label htmlFor="iconUser"> Foto de perfil</label>
                    <input type="iconUser" className="form-control" id="iconUser" defaultValue={user?.iconUser}/>
                </div>
                <div className="form-group leiloes-form-group">
                    <label htmlFor="email1">email</label>
                    <input type="email1" className="form-control" id="email1" defaultValue={user?.email}/>
                </div>  
                <div className="form-group leiloes-form-group">
                    <label htmlFor="userName">User name</label>
                    <input type="userName" className="form-control" id="userName" defaultValue={user?.userName}/>
                </div>
                <div className="form-group leiloes-form-group">
                    <label htmlFor="password1">Password</label>
                    <input type="password" className="form-control" id="password1" defaultValue={user?.password}/>
                </div>
                <div className="leiloes-form-btn-container">
                    <button type="submit" className="btn btn-primary leiloes-btn">Salvar</button>
                </div>
            </form >
        </div >
    </div >
    );
}

export default AltUserCard;