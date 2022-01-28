import axios from "axios";
import UserCard from "components/UserCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Usuario } from "types/usuario";
import { URL_USER } from "utils/requests";


function Usuarios(){

    const [page, setPage] = useState<Usuario[]>();
   


    useEffect(() => {
       axios.get(`${URL_USER}/list`).then(response =>{
          const data = response.data as Usuario[];
          setPage(data);
          
       })
    }, [])

    return(
        <div className="container">
            <div className="row">
                     
                     {page?.map(user => (
                        <div key={user.idUser} className="col-sm-6 col-lg-4 col-xl-3">
                        <UserCard user={user}/>
                      </div>
                     )
                     )}          
                           
            </div>
        </div>
    );
}

export default Usuarios;