import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from './components/layout/Container';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>
      <ul>
        <Link to='/home'>Home</Link>
        <Link to='/contact'>Contato</Link>
        <Link to='/company'>Empresa</Link>
        <Link to='/newproject'>Novo Projeto</Link>
      </ul>

      <Container customClass='min-height'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newproject' element={<NewProject />} />
        </Routes>
      </Container>

      <p>footer</p>
    </Router>
  );
}

export default App;
