import './Plat.scss';

export default function Plat({nom, prix}) {
  return (
    <div className="Plat">
      <p>{nom}</p>
      <p className="prix">{prix}</p>
    </div>
  );
}