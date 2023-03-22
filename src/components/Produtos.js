import React, { useState, useEffect } from 'react'
import {
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  TextField,
  Button
} from '@mui/material'
import {
  Add,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import api from '../services/api'

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [produtoEditando, setProdutoEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    async function fetchProdutos() {
      const response = await api.get('/produtos')
      setProdutos(response.data)
    }
    fetchProdutos()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const produto = {
      nome,
      descricao,
      preco_unitario: preco
    }

    if (produtoEditando) {
      await api.put(`/produtos/${produtoEditando.ID_Produto}`, produto)
      setProdutoEditando(null)
    } else {
      await api.post('/produtos', produto)
    }

    setNome('')
    setDescricao('')
    setPreco('')
    setOpen(false)
    const response = await api.get('/produtos')
    setProdutos(response.data)
  }

  async function handleEdit(produto) {
    setNome(produto.Nome_Produto)
    setDescricao(produto.Descricao_Produto)
    setPreco(produto.Preco_Unitario)
    setProdutoEditando(produto)
    setOpen(true)
  }

  async function handleDelete(id) {
    await api.delete(`/produtos/${id}`)
    const response = await api.get('/produtos')
    setProdutos(response.data)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Nome"
              margin="normal"
              value={nome}
              onChange={event => setNome(event.target.value)}
            />
            <br />
            <TextField
              required
              label="Descrição"
              margin="normal"
              value={descricao}
              onChange={event => setDescricao(event.target.value)}
            />
            <br />
            <TextField
              required
              label="Preço"
              margin="normal"
              value={preco}
              onChange={event => setPreco(event.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!nome || !descricao || !preco}
            onClick={handleSubmit}
          >
            {produtoEditando ? 'Atualizar' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={2} sx={{ mt: 2, mr: 1, ml: 2 }}>
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Produtos</Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map(produto => (
                <TableRow key={produto.ID_Produto}>
                  <TableCell>{produto.ID_Produto}</TableCell>
                  <TableCell>{produto.Nome_Produto}</TableCell>
                  <TableCell>{produto.Descricao_Produto}</TableCell>
                  <TableCell>{produto.Preco_Unitario}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(produto)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => handleDelete(produto.ID_Produto)}
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
          startIcon={<Add />}
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
        >
          Cadastrar Produtos
        </Button>
      </Stack>
    </div>
  )
}
