import { useState } from 'react';
import { Navbar, NavbarBrand  } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
function App() {
  const [dishes]=useState(DISHES);
  return (
    <div>
      <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href='/'>risetorante confusion</NavbarBrand>
        </div>
      </Navbar >
      <Menu dishes={dishes}/>
    </div>
  );
}

export default App;
