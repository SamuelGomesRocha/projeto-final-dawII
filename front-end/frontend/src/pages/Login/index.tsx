import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Usuario } from 'types/usuario';
import { URL_USER } from 'utils/requests';
import './styles.css'


function Login(){

    const navigate = useNavigate();
    const [user, setUser] = useState<Usuario>();
    const [verify, setVerify] = useState(false);
    const img = 'https://blog.vipleiloes.com.br/wp-content/uploads/2019/07/original-a0ae55c760d4749185efcf3c8fed0699-724x450.jpg';
    const [gambiarra, setGambiarra] = useState("");


    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const userName = (event.target as any).user_name.value;
        const password = (event.target as any).password.value;

        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:8080',
            method: 'POST',
            url: '/auth/login',
            data: {
                userName: userName,
                password: password
            }
        }

      
        axios(config).then(response => {
            console.log(response.data)
            setGambiarra(userName)
            console.log("gambiarra "+gambiarra)
            setVerify(true);
        });

    }

   
    useEffect(() => {
        if(verify == true){
            console.log("gambiarra2 "+gambiarra)   
            axios.get(`${URL_USER}/obtem/${gambiarra}`).then(resp => {
                setUser(resp.data as Usuario);

               sessionStorage.setItem('idUseraaa', `${user?.idUser}`);
            
                navigate(`/list`);
            })
        }
    }, [handleSubmit])

    return(
        <div className="dsmovie-form-containerr">
            <img className="dsmovie-movie-card-imagear" src={img} alt={'Login'}/>
            <div className="dsmovie-card-bottom-container">
            <div className="atx-lances">{"Login"}</div>   
            <form className="form-login" onSubmit={handleSubmit}>
            <div className="form-group dsmovie-form-group">
            <label htmlFor="loginData"> Usuário </label>
            <input type="text" className="form-control" id='user_name'/>
            </div> 

           <div className="form-group dsmovie-form-group">  
           
            <label htmlFor="passData"> Senha </label>
                <input type="password" className="form-control" id='password'/>
                </div> 
                <button type="submit" className="btn btn-primary dsmovie-btn" > Login</button>
            </form>
            <div className='sup-imp'>
                <Link to='/cadUser'><h3 >Sign-up</h3></Link>
            </div>
            </div>
        </div>
    );
}

export default Login;