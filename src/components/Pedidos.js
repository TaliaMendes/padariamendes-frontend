import React, { useState, useEffect } from 'react'
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material'
import {
  AddShoppingCart,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Save,
  ShoppingBasket
} from '@mui/icons-material'
import api from '../services/api'

export default function Pedidos() {
  const [produtos, setProdutos] = useState([])
  const [clientes, setClientes] = useState([])
  const [itensPedido, setItensPedido] = useState([])
  const [idCliente, setIdCliente] = useState('')
  const [idProduto, setIdProduto] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [produtoEditando, setProdutoEditando] = useState(null)
  const [clienteEditando, setClienteEditando] = useState(null)

  useEffect(() => {
    async function fetchProdutos() {
      const response = await api.get('/produtos')
      setProdutos(response.data)
    }
    fetchProdutos()
  }, [])

  useEffect(() => {
    async function fetchClientes() {
      const response = await api.get('/clientes')
      setClientes(response.data)
    }
    fetchClientes()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const dataPedido = new Date().toISOString().split('T')[0]
    const pedido = {
      id_cliente: idCliente,
      itens: itensPedido,
      data: dataPedido
    }
    await api.post('/pedidos', pedido)
    setIdCliente('')
    setItensPedido([])
  }

  async function handleAddItem(event) {
    event.preventDefault()
    const produto = produtos.find(p => p.ID_Produto === parseInt(idProduto))
    const itemPedido = {
      id_produto: parseInt(idProduto),
      quantidade: parseInt(quantidade),
      produto
    }

    setItensPedido([...itensPedido, itemPedido])
    setIdProduto('')
    setQuantidade('')
  }

  async function handleDeleteItem(index) {
    const newItensPedido = [...itensPedido]
    newItensPedido.splice(index, 1)
    setItensPedido(newItensPedido)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ mt: 8, ml: 5, mr: 5 }} elevation={2}>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              startIcon={<AddShoppingCart />}
              sx={{ textTransform: 'none' }}
            >
              Adicionar no carrinho
            </Button>
          </ButtonGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <FormControl margin="normal">
              <InputLabel id="cliente-label">Cliente</InputLabel>
              <Select
                sx={{ width: '200px' }}
                labelId="cliente-label"
                value={idCliente}
                id="cliente-select"
                onChange={event => setIdCliente(event.target.value)}
              >
                {clientes.map(cliente => (
                  <MenuItem key={cliente.ID_Cliente} value={cliente.ID_Cliente}>
                    {cliente.Nome_Cliente}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl margin="normal">
              <InputLabel id="produto-label">Produto</InputLabel>
              <Select
                labelId="produto-label"
                sx={{ width: '200px' }}
                value={idProduto}
                onChange={event => setIdProduto(event.target.value)}
                id="produto-select"
              >
                {produtos.map(produto => (
                  <MenuItem key={produto.ID_Produto} value={produto.ID_Produto}>
                    {produto.Nome_Produto} - R$ {produto.Preco_Unitario}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="number"
              label="Quantidade"
              margin="normal"
              px
              value={quantidade}
              onChange={event => setQuantidade(event.target.value)}
            />

            <Button
              type="submit"
              sx={{ height: '36px' }} // altura aumentada
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddItem}
            >
              Adicionar Item
            </Button>
          </Stack>
        </Paper>
        <Paper
          sx={{ p: 2, mt: 8, mb: 4, marginLeft: '5px', marginRight: '5px' }}
        >
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              startIcon={<ShoppingBasket />}
              sx={{ textTransform: 'none' }}
            >
              Carrinho
            </Button>
          </ButtonGroup>
          <TableContainer component={Paper}>
            <Table aria-label="itens do pedido">
              <TableHead>
                <TableRow>
                  <TableCell>Produto</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Preço Unitário</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itensPedido.map((itemPedido, index) => (
                  <TableRow key={index}>
                    <TableCell>{itemPedido.produto.Nome_Produto}</TableCell>
                    <TableCell>{itemPedido.quantidade}</TableCell>
                    <TableCell>{itemPedido.produto.Preco_Unitario}</TableCell>
                    <TableCell>
                      {itemPedido.quantidade *
                        itemPedido.produto.Preco_Unitario}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mr: 2 }}>
          <Button
            startIcon={<Save />}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '175px' }}
          >
            Salvar Pedido
          </Button>
        </Stack>
      </form>
    </div>
  )
}
