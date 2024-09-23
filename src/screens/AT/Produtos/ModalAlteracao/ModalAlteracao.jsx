import ModalStyle from './modalAlteracao.module.css';
import { useState } from 'react';

export default function AlterarProduto({produtoAtual}) {
    const [produto, setProduto] = useState(produtoAtual);
    const [imagemAd, setImagemAd] = useState([]);
    const [novaImagem, setNovaImagem] = useState(''); 

    const atualizarProdutos = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: name === 'img'? imagemAd: value,
        }));
    };

    const atualizarImgem = () => {
        if (novaImagem.trim() !== '') {
            setImagemAd((prevImagemAd) => [...prevImagemAd, novaImagem]);
            setNovaImagem('');
        }
    };

    const Submit = (e) => {
        e.preventDefault();
    
        let camposVazios = false;
        Object.values(produto).forEach((campo, idx) => {
            if (idx === 6){
                campo = [...imagemAd]
            }
            if (typeof campo === 'string' && campo.trim() === '') {
                camposVazios = true;
            }
            if (Array.isArray(campo) && campo.length === 0) {
                camposVazios = true;
            }
            if (idx ===  3 || idx === 4){
                (parseFloat(campo) > 0 ? '': camposVazios = true)
            }
        });
        
        if (!camposVazios) {
            produto.img = [...imagemAd]
            localStorage.setItem(`produto-${produto.id}`, JSON.stringify(produto));
            console.log('Produto salvo no localStorage:', produto);
            alert('Produto cadastrado com sucesso!');
            
            setProduto({
                nome: '',
                titulo: '',
                descricao: '',
                valor: '',
                quantidade: '',
                favorito: false,
                img: '',
                estrelas: 0,
                id: Date.now() * Math.random(),
            });
            setImagemAd([])
        } else {
            alert('Preencha todos os campos');
        }
    };

    return (
        <div className={ModalStyle.modalSuspenso}>
            <form onSubmit={Submit}>
                <label htmlFor="nome">Nome do produto</label>
                <input type="text" 
                    name="nome" 
                    value={produto.nome}
                    onChange={atualizarProdutos}
                />
                
                <label htmlFor="titulo">Título</label>
                <input type="text" 
                    name="titulo" 
                    value={produto.titulo}
                    onChange={atualizarProdutos}
                />
                
                <label htmlFor="descricao">Descrição</label>
                <input type="text" 
                    name="descricao" 
                    value={produto.descricao}
                    onChange={atualizarProdutos}
                />
                
                <label htmlFor="valor">Valor</label>
                <input type="number" 
                    name="valor" 
                    value={produto.valor}
                    onChange={atualizarProdutos}
                />
                
                <label htmlFor="quantidade">Quantidade</label>
                <input type="number" 
                    name="quantidade" 
                    value={produto.quantidade}
                    onChange={atualizarProdutos}
                />
                
                <label htmlFor="img">Imagem</label>
                <input type="text" 
                    name="img" 
                    value={novaImagem}
                    onChange={(e) => setNovaImagem(e.target.value)}
                />
                <button 
                type='button'
                onClick={atualizarImgem}>
                    Adicionar outra imagem</button>
                {imagemAd.length > 0 && (
                    <ul>
                        {imagemAd.map((img, index) => (
                            <li key={index}>{img}</li>
                        ))}
                    </ul>
                )}
                <label htmlFor="estrelas">Estrelas</label>
                <input type="number" 
                    name="estrelas" 
                    value={produto.estrelas}
                    onChange={atualizarProdutos}
                />
                
                <button type="submit" className={ModalStyle.enviar}>Enviar</button>
            </form>
        </div>
    );
}
