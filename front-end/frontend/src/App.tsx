  import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Leiloes from 'pages/Leiloes';
import CadLeilao from 'pages/CadLeilao';
import Navbar from "components/Navbar";
import AltLeilao from "pages/AltLeilao";
import Login from "pages/Login";
import CadUser from "pages/CadUser";
import Usuarios from "pages/Usuarios";
import AltUser from "pages/AltUser";
import Lance from "pages/Lances";
import DataLeilaoComponent from "components/StatusComponent";
import { useEffect, useState } from "react";
import Caminho from "utils/Routes";
import PiorCaminho from "utils/PiorCaminho";
import CompWin from "components/LanceComponents/WinnerComponent";





function App() {

  const [dropdown, setDropdown] = useState("");

  const showDropdown = () => {
    console.log("show");
    //se clicar no botão, modal aparece
    setDropdown("show");
    document.body.addEventListener("click", closeDropdown);
  }

  const closeDropdown = () => {
    console.log("hidden");
    setDropdown("");
    document.body.removeEventListener("click", closeDropdown);
  };

  const leilao = {
    idLeilao: 2,
    item: "Teste",
    lanceMinimo: 30,
    status: '2',
    dataExpiracao: 'string',
    urlIcon: 'string'
}

const [verify, setVerify] = useState(true);

let acaso = '';

console.log("Verify before acaso: "+verify)
 acaso = window.location.href;
  console.log(acaso)

useEffect(() =>{

  if(acaso === "http://localhost:3000/"){
    console.log("Acaso aqui: "+ acaso)
  setVerify(false)

}
console.log("Verify after acaso: "+verify)



}, [])

//if(sessionStorage.getItem('idUseraaa') != '0'){
  return (
   // <Caminho />
   // <PiorCaminho />

    
    <BrowserRouter>
    {verify && (
         <Navbar />
    )}
  
     
      <Routes> 
        <Route path="/test" element={<CompWin />} />
        <Route path='/'  element={<Login />}/>
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
  
  );
  /*
}
  return(
    <BrowserRouter >
      <Routes>
   
        <Route path={path} element={<Login />} />
        <Route path="/cadUser" element={<CadUser />} />  
      </Routes>
    </BrowserRouter>
  );
}
*/
}

export default App;