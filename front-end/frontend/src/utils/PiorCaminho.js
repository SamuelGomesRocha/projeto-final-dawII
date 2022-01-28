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
import { BrowserRouter, Route, Routes } from "react-router-dom";


const leilao = {
    idLeilao: 2,
    item: "Teste",
    lanceMinimo: 30,
    status: '2',
    dataExpiracao: 'string',
    urlIcon: 'string'
}


const PiorCaminho = () => (
    <BrowserRouter>
    
     <Navbar />
    
      <Routes> 
        <Route path="/test" element={<DataLeilaoComponent leilao={leilao}/>} />
        <Route path='/' element={<Login />} />
        <Route path={`/lance`}>
          <Route path={`:idLeilao`} element={<Lance/>} />
        </Route>
        <Route path="/list" element={<Leiloes />} />
        <Route path="/users" element={<Usuarios />} />
        <Route path="/altUser">
        <Route path=":userId" element={<AltUser />} />
        </Route>
        <Route path="/cadUser" element={<CadUser />} />  
        <Route path="/AltLeilao">
          <Route path=":leilaoId" element={<AltLeilao />} />
        </Route>
        <Route path="/CadLeilao" element={<CadLeilao />} />
      </Routes>
    </BrowserRouter>
)


export default PiorCaminho;