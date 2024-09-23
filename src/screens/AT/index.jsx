import { Link, useNavigate } from "react-router-dom";

import Button from '../../components/button';
import { HeaderBotton, HeaderTop}  from "./components/header.jsx";
import style from './Home.module.css'
import CardProduct from '../AT/CardHome/Card.jsx'

export default function AT() {

  const navigate = useNavigate();

  return (
    <div className={style.containerHome}>
      <CardProduct />
    </div>
  );
};