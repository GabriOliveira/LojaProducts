import { Button, Snackbar, InputLabel, IconButton, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext, useMemo, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useCarrinhoContext } from 'common/contexts/Carrinho';
import Produto from 'components/Produto';
import { Pagamento, usePagamentoContext } from 'common/contexts/Pagamento';
import { UsuarioContext } from 'common/contexts/Usuario';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho,novoTotalCarrinho,efetuarCompra } = useCarrinhoContext()
  const history = useHistory()
  const {tiposPagamento,formaPagamento,mudarFormaDePagamento} = usePagamentoContext(Pagamento)
  const {saldo} = useContext(UsuarioContext)
  const saldoTotal = useMemo(()=>saldo-novoTotalCarrinho,[saldo,novoTotalCarrinho])
  return (
    <Container>
      <Voltar onClick={()=>{history.goBack()}} />
      <h2>
        Carrinho
      </h2>
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
         <Select onChange={(e)=>{mudarFormaDePagamento(e.target.value)}} value={formaPagamento.id}>
             {tiposPagamento.map((pagamento)=>(
              <MenuItem key={pagamento.id} value={pagamento.id}> 
                    {pagamento.nome}
              </MenuItem>
             ))}
         </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {novoTotalCarrinho} </span>
          </div>
          <div>
            <h2> Saldo:  </h2>
            <span> R$ {saldo} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R${saldoTotal}  </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          efetuarCompra()
          
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
        {carrinho.map((item)=>(
         <Produto
         {...item}
         key={item.id}
         
         />
        ))}


    </Container>
  )
}

export default Carrinho;