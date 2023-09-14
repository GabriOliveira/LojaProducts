import { useContext, useEffect } from "react";
import { useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

const { createContext } = require("react");

export const CarrinhoContext=createContext();
CarrinhoContext.displayName="Carrinho";
export function CarrinhoProvider({children}){
    const [carrinho,setCarrinho]=useState([])
    const [quantidade,setQuantidade] = useState(0)
    const [novoTotalCarrinho,setNovoTotalCarrinho] = useState(0)
    return(
        <CarrinhoContext.Provider value={{carrinho,setCarrinho,quantidade,setQuantidade,novoTotalCarrinho,setNovoTotalCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
}


export const useCarrinhoContext = () => {
    const {carrinho,setCarrinho,quantidade,setQuantidade,novoTotalCarrinho,setNovoTotalCarrinho} = useContext(CarrinhoContext);
    const {formaPagamento} = usePagamentoContext()
    const {saldo,setSaldo} = useContext(UsuarioContext)

    function efetuarCompra(){
      setCarrinho([])
      setSaldo(saldo-novoTotalCarrinho)
    }

    useEffect(()=>{
      const {novaQuantidade,novoTotal}=carrinho.reduce((contador,item)=>({
         novaQuantidade : contador.novaQuantidade+item.quantidade,
         novoTotal : contador.novoTotal + (item.valor * item.quantidade)
      }),
      {
        novaQuantidade : 0,  novoTotal : 0
      })
       setQuantidade(novaQuantidade)
       setNovoTotalCarrinho(novoTotal*formaPagamento.juros)
    },[carrinho,setQuantidade,setNovoTotalCarrinho,formaPagamento])


    function mudarQuantidade(id,quantidade){
        return carrinho.map(itemDoCarrinho=>{
            if(itemDoCarrinho.id=== id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho
          })
    }
    function adicionarProduto(novoProduto){
        const temOProduto=carrinho.some(itemDoCarrinho=>itemDoCarrinho.id === novoProduto.id);
        if(!temOProduto){
          novoProduto.quantidade = 1;
          return setCarrinho(carrinhoAnterior=> 
          [...carrinhoAnterior,novoProduto
          ])
        }
        setCarrinho(mudarQuantidade(novoProduto.id,1))
        
      }
      function removerProduto(id){
        const produto=carrinho.find(itemDoCarrinho=>itemDoCarrinho.id=== id);
        const ehOUltimo=produto.quantidade ===1;
        if(ehOUltimo){
            return setCarrinho(carrinhoAnterior=>carrinhoAnterior.filter(itemDoCarrinho=>itemDoCarrinho.id !== id));
        }
        setCarrinho(mudarQuantidade(id,-1))
      }
      console.log("ola")
      console.log(novoTotalCarrinho)
    return{
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        quantidade,
        setQuantidade,
        novoTotalCarrinho,
        efetuarCompra
        
    }
}