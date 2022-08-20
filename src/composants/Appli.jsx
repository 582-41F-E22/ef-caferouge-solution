import './Appli.scss';
import logo from '../images/logo.png';
import Menu from './Menu';
import l12n from '../textes.L12n.json';
import {useState} from 'react';

export default function Appli() {
  // Remarquez le 'lazy initialization' de l'état 
  const [lan, setLan] = useState(()=>localStorage.getItem('caferouge-lan') || 'fr');

  /**
   * Stocke la langue choisit en localStorage et modifie l'état de la variable de langue
   * @param {MouseEvent} evt événement Click
   */
  const changerLangue = (evt) => {
    // Détecter le choix de langue
    const langue = evt.target.innerText.toLowerCase();
    // Stocker dans localStorage
    localStorage.setItem('caferouge-lan', langue); 
    // Modifier l'état 'lan'
    setLan(langue);
  }

  return (
    <div className="Appli">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h3>Café rouge</h3>
          <h5>{l12n.entete.amorce[lan]}</h5>
        </div>
      </header>
      <Menu l12n={l12n} lan={lan}/>
      <footer>
        <div className="adresse">{l12n.p2p.adresse[lan]}</div>
        <div className="tel">+1 (321) 987 6543</div>
        <div className="choix-langue">
          <span onClick={changerLangue}>fr</span>
          &bull;
          <span onClick={changerLangue}>en</span>
        </div>
      </footer>
    </div>
  );
}
