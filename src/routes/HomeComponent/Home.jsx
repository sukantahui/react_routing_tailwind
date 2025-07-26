import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Teachers from './Teachers';
import Courses from './Courses';
export default function Home() {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <>
      <Header/>
      <About/>
      <Courses/>  
      <Teachers/>
      <Services/>
      <Contact/>
      <Footer/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
