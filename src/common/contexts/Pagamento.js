
import React, { createContext, useContext, useState } from 'react'

export const Pagamento = createContext()
Pagamento.displayName = "pagamento"

export function PagamentoProvider({ children }) {

    const tiposPagamento = [
        {
            id: 1,
            nome: 'boleto',
            juros: 1
        },
        {
            id: 2,
            nome: 'cartão',
            juros: 1.5
        },
        {
            id: 3,
            nome: 'pix',
            juros: 1
        },
        {
            id: 4,
            nome: 'crediario',
            juros: 3
        }
    ]

    
    const [formaPagamento,setFormaPagamento] = useState('');

    return (
        <Pagamento.Provider value={{tiposPagamento,formaPagamento,setFormaPagamento}}>
            {children}
        </Pagamento.Provider>
    )
}

export const usePagamentoContext =()=>{
    const {tiposPagamento,formaPagamento,setFormaPagamento} = useContext(Pagamento)
   
    function mudarFormaDePagamento(id){
       const pagamentoAtual = tiposPagamento.find(tipoPagamento=>tipoPagamento.id == id)
       setFormaPagamento(pagamentoAtual)
    }


    return({
        tiposPagamento,mudarFormaDePagamento,formaPagamento
    })

}
