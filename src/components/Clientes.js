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
  IconButton,
  TextField,
  Stack,
  Button
} from '@mui/material'
import {
  Add,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import api from '../services/api'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [editando, setEditando] = useState(false)
  const [idClienteEditando, setIdClienteEditando] = useState(null)

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    async function fetchClientes() {
      const response = await api.get('/clientes')
      console.log(response)
      setClientes(response.data)
    }
    fetchClientes()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    console.log(idClienteEditando)
    const cliente = {
      nome,
      email,
      endereco,
      telefone
    }

    if (editando) {
      await api.put(`/clientes/${idClienteEditando}`, cliente)
      setEditando(false)
      setIdClienteEditando(null)
    } else {
      await api.post('/clientes', cliente)
    }

    setNome('')
    setEmail('')
    setTelefone('')
    setEndereco('')

    setOpen(false)
    const response = await api.get('/clientes')
    setClientes(response.data)
  }

  async function handleDelete(id) {
    await api.delete(`/clientes/${id}`)
    const response = await api.get('/clientes')
    setClientes(response.data)
  }
  async function handleEdit(cliente) {
    setEditando(true)
    setNome(cliente.Nome_Cliente)
    setEmail(cliente.Email_Cliente)
    setTelefone(cliente.Telefone_Cliente)
    setEndereco(cliente.Endereco_Cliente)
    setIdClienteEditando(cliente.ID_Cliente)
    setOpen(true)
  }

  return (
    <div>
      {/* <Paper
        elevation={2}
        sx={{
          mb: 2,
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '50%'
        }}
      >
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button startIcon={<Add />} sx={{ textTransform: 'none' }}>
            Cadastrar/Alterar Cliente
          </Button>
        </ButtonGroup>
        <form
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
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
            label="Email"
            margin="normal"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <br />
          <TextField
            required
            label="Endereço"
            margin="normal"
            value={endereco}
            onChange={event => setEndereco(event.target.value)}
          />
          <br />
          <TextField
            required
            label="Telefone"
            margin="normal"
            value={telefone}
            onChange={event => setTelefone(event.target.value)}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            {editando ? 'Atualizar' : 'Salvar'}
          </Button>
        </form>
      </Paper> */}

      <Paper elevation={2} sx={{ mt: 2, mr: 1, ml: 2 }}>
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Clientes</Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map(cliente => (
                <TableRow key={cliente.ID_Cliente}>
                  <TableCell>{cliente.ID_Cliente}</TableCell>
                  <TableCell>{cliente.Nome_Cliente}</TableCell>
                  <TableCell>{cliente.Telefone_Cliente}</TableCell>
                  <TableCell>{cliente.Email_Cliente}</TableCell>
                  <TableCell>{cliente.Endereco_Cliente}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(cliente)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => handleDelete(cliente.ID_Cliente)}
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
          Cadastrar Clientes
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            margin: '0 auto',
            marginTop: 100,
            width: 650,
            maxWidth: '100%'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {editando ? 'Editar Cliente' : 'Cadastrar Cliente'}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <DialogContentText>Preencha os dados abaixo:</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Nome"
              margin="normal"
              value={nome}
              onChange={event => setNome(event.target.value)}
            />
            <br />
            <TextField
              fullWidth
              required
              label="Email"
              margin="normal"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <br />
            <TextField
              fullWidth
              required
              label="Endereço"
              margin="normal"
              value={endereco}
              onChange={event => setEndereco(event.target.value)}
            />
            <br />
            <TextField
              required
              fullWidth
              label="Telefone"
              margin="normal"
              value={telefone}
              onChange={event => setTelefone(event.target.value)}
            />
            <br />
            <DialogActions sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                {editando ? 'Atualizar' : 'Salvar'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
