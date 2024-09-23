import { useState, useEffect } from "react";
import ProdutoStyle from './produtos.module.css';
import { IoAddOutline } from "react-icons/io5";
import CadastroProdutos from "./ModalCadastro/ModalCadastro";
import { MdClose } from "react-icons/md";
import AlterarProduto from "./ModalAlteracao/ModalAlteracao";
import { useLocation } from 'react-router-dom';
import { HeaderTop } from "../components/header";
import { useNavigate } from 'react-router-dom';


export default function Produto() {
    const location = useLocation();
    const { produtoView } = location.state || {};

    const navigate = useNavigate();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [imgPrincipal, setImgPrincipal] = useState(0);
    const [showCadastro, setShowCadastro] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [menuDelet, setMenuDelet] = useState(false);
    const [alterarItem, setAlterarItem] = useState(false)

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

        const salvarProdutoNoStorage = (produto) => {
        localStorage.setItem(`produto-${produto.id}`, JSON.stringify(produto));
        recuperarProdutos();
    };

    const favoritar = (e) =>{
        const itemString = localStorage.getItem(`produto-${e}`)
        const item = JSON.parse(itemString)
        item.id = e
        item.favorito = (!item.favorito)
        localStorage.setItem(`produto-${e}`, JSON.stringify(item))
        recuperarProdutos()
    }

    const deletarProduto = (e) => {
        localStorage.removeItem(`produto-${e}`)
        setMenuDelet(!menuDelet)
        recuperarProdutos()
    }

    useEffect(() => {
        recuperarProdutos();
    }, []);
    
    const produtoAtual = JSON.parse(localStorage.getItem(`produto-${produtoView.id}`));

    return (
        <div className={ProdutoStyle.central}>
            <div className={ProdutoStyle.header}>
                <HeaderTop />
            </div>
            <div className={ProdutoStyle.container}>
            <div className={ProdutoStyle.descricao}>
                <div className={ProdutoStyle.descricaoProduto}>
                    <h2>{produtoAtual.nome}</h2>
                    <p>{produtoAtual.titulo}</p>
                    <ul>
                        <li>{produtoAtual.descricao}</li>
                    </ul>
                </div>
                <div className={ProdutoStyle.venda}>
                    <p>Valor</p>
                    <p>R$: {produtoAtual.valor}</p>
                    <p>Quantidade restante</p>
                    <p>{produtoAtual.quantidade}</p>
                    <p>Estrelas</p>
                    <p>{produtoAtual.estrelas}</p>
                    <button>Comprar</button>
                    <button>Adicionar ao carrinho</button>
                    <p>Parcela em 12x no cartão de crédito</p>
                </div>
            </div>

            <div className={ProdutoStyle.containterCentral}>
                <img 
                    src={produtoAtual.img[imgPrincipal]} 
                    alt="Img Principal Anúncio" 
                    className={ProdutoStyle.imagemPrincipal}
                />
            </div>
            <ul className={ProdutoStyle.imagensSelecao}>
                {produtoAtual.img.map((e, idx) => (
                    <li key={idx}>
                        <img 
                            src={e} 
                            alt="Img Anúncio"
                            className={ProdutoStyle.imagensSecundarias}
                            onMouseEnter={() => setImgPrincipal(idx)}
                        />
                    </li>
                ))}
            </ul>
            <button 
                className={ProdutoStyle.ButtonBotton}
                onClick={() => {setSubMenuOpen(!subMenuOpen)}}
            >
                <IoAddOutline size={30} />
            </button>
            <div className={subMenuOpen ? ProdutoStyle.subMenuOpen : ProdutoStyle.subMenuClose}>
                <ul>
                    <li>
                        <button onClick={() => { setShowCadastro(true); setSubMenuOpen(false); }}>
                            Vender um igual
                        </button>
                    </li>
                    <li>
                        <button 
                        onClick={() => {favoritar(produtoAtual.id)}}>
                            {produtoAtual.favorito ?  'Desfavoritar': 'Favoritar'}
                        </button>
                    </li>
                    <li>
                        <button
                        onClick={() => {setAlterarItem(!alterarItem); setSubMenuOpen(false);}}
                        >Alterar</button>
                    </li>
                    <li>
                        <button 
                        onClick={() => {setMenuDelet(!menuDelet); setSubMenuOpen(false);}}>
                            Deletar
                        </button>
                    </li>
                </ul>
            </div>
            {showCadastro && (
                <div className={ProdutoStyle.modalContainer}>
                    <CadastroProdutos onSave={salvarProdutoNoStorage} />
                    <button 
                        onClick={() => setShowCadastro(false)}
                        className={ProdutoStyle.modalContainerButton}
                    >
                        <MdClose size={25} />  
                    </button>
                </div>
            )}
            
            <div className={menuDelet ? ProdutoStyle.deletarProduto: ProdutoStyle.noneProduto}>
                <p>Tem certeza que deseja apagar o produto?</p>
                <div>
                    <button 
                    onClick={() => {deletarProduto(produtoAtual.id); navigate('/');}}
                    className={ProdutoStyle.buttonDelet}
                    >Sim</button>
                    <button 
                    onClick={() => {setMenuDelet(!menuDelet)}}
                    className={ProdutoStyle.buttonDelet}
                    >Não</button>
                </div>

            </div>
            {alterarItem && (
                <div className={ProdutoStyle.modalContainer}>
                    <AlterarProduto produtoAtual={produtoAtual} />
                    <button 
                        onClick={() => {
                            setAlterarItem(false); 
                            navigate('/Produto', { state: { produtoView: produtoAtual } });
                            recuperarProdutos()
                        console.log(produtoAtual)
                        }}
                        className={ProdutoStyle.modalContainerButton}
                    >
                        <MdClose 
                        size={25} 
                        />  
                    </button>
                </div>
            )}
        </div>
        </div>
        
    );
}
