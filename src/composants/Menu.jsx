import './Menu.scss';
import menuIconPlats from '../images/menu_icon_plats.png';
import Plat from './Plat';
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, query, collection, orderBy } from "firebase/firestore";
import { useEffect, useState } from 'react';
// Initialiser Firebase
const firebaseConfig = {
  // Remplacez par vos propres valeurs de l'objet de config Firebase
};

// Initialiser Firebase
initializeApp(firebaseConfig);

// Initialiser Firestore
export const bdFirestore = getFirestore();

export default function Menu({l12n, lan}) {
  let [menu, setMenu] = useState([]);

  // Chercher les plats du menu...
  useEffect(() => {
    getDocs(query(collection(bdFirestore, 'caferouge'), orderBy('prix', 'asc'))).then(
      res => setMenu(res.docs.map(
          // Remarquez comment on va chercher le nom du plat dans la langue choisie 
          // au niveau de la variable d'état 'menu' 
          plat => ({id: plat.id, nom: plat.data()['nom_' + lan], prix: plat.data().prix})
        )
      )
    )
  }, [lan]); // la variable d'état 'lan' est une dépendance du useEffect

  return (
    <div className="Menu">
      <div className="titre">
        <img alt="Entrées/Snacks" src={menuIconPlats} />
        <p>{l12n.menu.entrees[lan]}</p>
      </div>
      {
        menu.map(plat => <Plat key={plat.id} {... plat} />)
      }
    </div>
  );
}