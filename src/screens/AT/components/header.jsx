import HeaderStyle from "./headerstyle.module.css";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { VscColorMode } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function HeaderTop({ setFavorito, setOrdemValor }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [favoritos, setFavoritos] = useState(false);
  const [ordem, setOrdem] = useState(false);
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const storageDarkMode = localStorage.getItem("dark");
    return storageDarkMode ? JSON.parse(storageDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const DarkMode = () => {
    setDark((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  const handleClickButton = () => {
    setFavoritos(!favoritos);
    setFavorito(favoritos);
  };

  const ordemCard = () => {
    setOrdem(!ordem);
    setOrdemValor(ordem);
  };

  const irParaHome = () => {
    navigate("/");
  };

  return (
    <div className={HeaderStyle.headerTop}>
      <button
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
        className={HeaderStyle.buttonSubMenu}
      >
        <IoMdMenu size={30} />
      </button>

      <button
        type="button"
        className={HeaderStyle.buttonSubMenu}
        onClick={DarkMode}
      >
        <VscColorMode size={30} />
      </button>
      <nav className={openMenu ? HeaderStyle.openMenu : HeaderStyle.closeMenu}>
        <ul className={HeaderStyle.subMenuList}>
          <li>
            <button
              onClick={() => {
                irParaHome();
              }}
              className={HeaderStyle.subMenuItem}
            >
              Menu
            </button>
          </li>
          <li>
            <button
              className={HeaderStyle.subMenuItem}
              onClick={handleClickButton}
            >
              Favoritos
            </button>
          </li>
          <li>
            <button className={HeaderStyle.subMenuItem} onClick={ordemCard}>
              Organizar por {ordem ? "Valor" : "Favoritos"}
            </button>
          </li>
        </ul>
        <button
          className={
            openMenu ? HeaderStyle.openIconClose : HeaderStyle.closeIconClose
          }
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <IoMdClose size={30} />
        </button>
      </nav>
    </div>
  );
}

export function HeaderBotton({ setFiltro }) {
  const menu_itens = [
    "Novidades",
    "Mais vendidos",
    "Oferta do dia",
    "Login",
    "Sua lista",
    "Computadores",
  ];
  const [busca, setBusca] = useState("");

  const handleInputChange = (event) => {
    const valor = event.target.value;
    setBusca(valor);
    setFiltro(valor);
  };

  return (
    <div className={HeaderStyle.Menu}>
      <div className={HeaderStyle.topMenu}></div>
      <input
        type="text"
        className={HeaderStyle.MenuInput}
        placeholder="Digite o nome do produto"
        value={busca}
        onChange={handleInputChange}
      />

      <menu className={HeaderStyle.MenuBar}>
        <ul className={HeaderStyle.MenuList}>
          {Object.values(menu_itens).map((e, idx) => {
            return (
              <li className={HeaderStyle.MenuItem} key={idx}>
                {e}
              </li>
            );
          })}
        </ul>
      </menu>
    </div>
  );
}
