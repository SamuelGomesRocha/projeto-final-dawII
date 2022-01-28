import Navbar from "components/Navbar";
import DataLeilaoComponent from "components/StatusComponent";
import AltLeilao from "pages/AltLeilao";
import AltUser from "pages/AltUser";
import CadLeilao from "pages/CadLeilao";
import CadUser from "pages/CadUser";
import Lance from "pages/Lances";
import Leiloes from "pages/Leiloes";
import Login from "pages/Login";
import Usuarios from "pages/Usuarios";
import React, { Fragment } from "react";
import { Route, Switch, Redirect, Navigate, Routes, Outlet, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { isAuthenticated } from "./Auth";



const leilao = {
    idLeilao: 2,
    item: "Teste",
    lanceMinimo: 30,
    status: '2',
    dataExpiracao: 'string',
    urlIcon: 'string'
}

const PrivateRoute = () => {
    const auth = isAuthenticated()
    return auth ? <Outlet /> : <Login/>;
}


const Caminho = () => (
    <Router> 
     <Fragment>
       <Navbar />
        <Routes>
        
            <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path={`/lance`}>
            <Route exact path={`:idLeilao`} element={<Lance/>} />
            </Route>
            <PrivateRoute exact path="/list" element={<Leiloes />} />
            <Route exact path="/users" element={<Usuarios />} />
            <Route exact path="/altUser">
            <Route exact path=":userId" element={<AltUser />} />
            </Route>
            <Route exact path="/cadUser" element={<CadUser />} />  
            <Route exact path="/AltLeilao">
            <Route exact path=":leilaoId" element={<AltLeilao />} />
            </Route>
            <Route exact path="/CadLeilao" element={<CadLeilao />} />
           </Route>
            </Routes>
             </Fragment>
       
              
            
    </Router>
);

export default Caminho;