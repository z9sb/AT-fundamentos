import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardStyle from './Card.module.css'
import ProdutoStyle from '../Produtos/produtos.module.css'
import { IoAddOutline } from "react-icons/io5";
import CadastroProdutos from '../Produtos/ModalCadastro/ModalCadastro.jsx';
import { MdClose } from "react-icons/md";
import { HeaderBotton, HeaderTop } from "../components/header.jsx";

export default function CardProduct(){
    const produtoExemplo = {
        nome: 'MONITOR GAMER SAMSUNG ODYSSEY G30',
        titulo: 'MONITOR GAMER SAMSUNG ODYSSEY G30 24" 144Hz 1ms AMD FreeSync Premium',
        descricao: 'REAJA EM TEMPO REAL Taxa de atualização de 144Hz. Pronto para derrotar inimigos.',
        valor: 764.10,
        quantidade: '1',
        favorito: false,
        img: [
            'https://m.media-amazon.com/images/I/61rd8zerEqL._AC_SX569_.jpg', 
            'https://m.media-amazon.com/images/I/51mMZYtPk2L._AC_SX569_.jpg',
            'https://m.media-amazon.com/images/I/41vMuRfEGVL._AC_SX569_.jpg',
            'https://m.media-amazon.com/images/I/41PlaSaAuXL._AC_SX569_.jpg',
        ],
        estrelas: 5,
        id: 'exemplo',
    };
    
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [favorito, setFavorito] = useState(false);
    const [ordemValor, setOrdemValor] = useState(false);

    const salvarProdutoNoStorage = (produto) => {
        localStorage.setItem(`produto-${produto.id}`, JSON.stringify(produto));
        recuperarProdutos();
    };
    
    const recuperarProdutos = () => {
        const produtosSalvos = [];
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            if (chave && chave.startsWith('produto-')) {
                const produto = JSON.parse(localStorage.getItem(chave));
                if (!Array.isArray(produto.img)) {
                    produto.img = [];
                }
                produtosSalvos.push(produto);
            }
        }
        setProdutos(produtosSalvos);
    };
    const produtosFiltrados = produtos.filter((produto) => {
        const nomeFiltrado = produto.nome.toLowerCase().includes(filtro.toLowerCase());
        if (favorito){
            return nomeFiltrado && produto.favorito === true;
        }
        return nomeFiltrado
        })
        .sort((a, b) => { return ordemValor ? a.valor - b.valor : a.estrelas - b.estrelas });

    useEffect(() => {
        recuperarProdutos();
        if (produtos.length === 0){
            salvarProdutoNoStorage(produtoExemplo)
        }
    }, []);

    const irParaProduto = (produto) => {
        navigate('/Produto', { state: { produtoView: produto } });
    };

    return (
        <div>
            <HeaderTop setFavorito={setFavorito} setOrdemValor={setOrdemValor}/>
            <HeaderBotton setFiltro={setFiltro}/>
            <div className={CardStyle.displayHome}>
            {produtosFiltrados.map((produto, idx) => (
                <div 
                key={idx} 
                onClick={() => irParaProduto(produto)}
                className={CardStyle.card}>
                    <p>Valor: {produto.valor}</p>
                    <p><strong>Estrelas:</strong>
                    {produto.estrelas}
                    </p>
                    <h3>{produto.nome}</h3>
                    <img src={produto.img} alt={produto.nome} />
                </div>
            ))}
            <button 
                className={ProdutoStyle.ButtonBotton}
                onClick={() => {setSubMenuOpen(!subMenuOpen)}}
            >
                <IoAddOutline size={30} />
            </button>
            <div className={subMenuOpen ? ProdutoStyle.subMenuOpen : ProdutoStyle.subMenuClose}>
                <button onClick={() => { setShowCadastro(true); setSubMenuOpen(false); }}>
                    Vender um igual
                </button>
            </div>
            {showCadastro && (
                <div className={ProdutoStyle.modalContainer}>
                    <CadastroProdutos onSave={salvarProdutoNoStorage} />
                    <button 
                        onClick={() => {setShowCadastro(false); location.reload()}}
                        className={ProdutoStyle.modalContainerButton}
                    >
                        <MdClose size={25} />  
                    </button>
                </div>
            )}
        </div>
        </div>
        
    );
}