import 'bootstrap/dist/css/bootstrap.css';
import 'index.css';
import './styles.css';
import {ReactComponent as CoinIcon} from 'assets/img/coin_image.svg';
import {  PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function Navbar(){

  const style = {
    color: 'red',
    fontfamily: 'Open Sans',
    fontsize: '12px'
  };


  const handleCLick = () => {
    sessionStorage.setItem('idUseraaa', '0');
  }


    return(
        
    <header>
        
        <Link to="/list">

        <div className='coin'>
             <CoinIcon className='coin-img'/>
        </div>
        </Link>
      
          <nav className="container-nav"> 
        
            <Link to='/CadLeilao'>
           <h1 className="text-new-leilao">novo leilão</h1>
           </Link>

           <Link to='/users'>
            <h1 className='txt-user'>usuários</h1>
           </Link>

                <div className="front-leilao-nav-content">
       
                <div className="icons-out">
                <PersonCircle />
                <Link to='/' style={{ textDecorationLine: "none"}}> <div style={style} onClick={handleCLick}>logout</div></Link>
               
                </div>
    
        
      </div>
    </nav>
  </header>
    );
}

export default Navbar;