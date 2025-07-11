import {Link } from 'react-router-dom';
function Header(){
    return(
        <>
       <nav>
        <Link to="/">Home</Link> | <Link to="/dashbord">Dashbord</Link>
      </nav>
      <br/>
        </>
    )
}

export default Header;