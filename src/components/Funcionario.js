import { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  MenuItem,
  Modal,
  Stack,
  Select,
  Paper,
  ButtonGroup,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material'
import { Delete, Edit, Person } from '@mui/icons-material'
import api from '../services/api'

function FuncionariosList() {
  const [funcionarios, setFuncionarios] = useState([])
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [funcionarioId, setFuncionarioId] = useState(null)
  const [cargos, setCargos] = useState([])
  const [cargoId, setCargoId] = useState(null)

  useEffect(() => {
    api.get('/cargos').then(response => {
      setCargos(response.data)
    })
  }, [])

  useEffect(() => {
    async function fetchFuncionarios() {
      const response = await api.get('/funcionarios')
      setFuncionarios(response.data)
    }
    fetchFuncionarios()
  }, [])
  const handleOpen = funcionario => {
    setOpen(true)

    setFuncionarioId(funcionario.id)
    setNome(funcionario.Nome_Funcionario)
    setEndereco(funcionario.Endereco_Funcionario)
    setTelefone(funcionario.Telefone_Funcionario)
    setEmail(funcionario.Email_Funcionario)
  }

  const handleClose = () => {
    setOpen(false)
    setFuncionarioId(null)
    setNome('')
    setEndereco('')
    setTelefone('')
    setEmail('')
  }
  const handleDelete = id => {
    api.delete(`/funcionarios/${id}`).then(() => {
      api.get('/funcionarios').then(response => {
        setFuncionarios(response.data)
      })
    })
  }

  const handleSave = () => {
    const funcionario = {
      nome,
      endereco,
      telefone,
      email,
      cargo: cargoId
    }
    if (funcionarioId) {
      // verificamos se há um id de funcionário selecionado
      api.put(`/funcionarios/${funcionarioId}`, funcionario).then(() => {
        // fazemos a requisição PUT para atualizar o registro
        api.get('/funcionarios').then(response => {
          setFuncionarios(response.data)
        })
      })
    } else {
      api.post('/funcionarios', funcionario).then(() => {
        // fazemos a requisição POST para adicionar um novo registro
        api.get('/funcionarios').then(response => {
          setFuncionarios(response.data)
        })
      })
    }
    handleClose()
  }
  return (
    <>
      <Paper elevation={2} sx={{ mt: 2, mr: 1, ml: 2 }}>
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Funcionários</Button>
        </ButtonGroup>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map(funcionario => (
              <TableRow key={funcionario.id}>
                <TableCell>{funcionario.Nome_Funcionario}</TableCell>
                <TableCell>{funcionario.Endereco_Funcionario}</TableCell>
                <TableCell>{funcionario.Telefone_Funcionario}</TableCell>
                <TableCell>{funcionario.Email_Funcionario}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleOpen(funcionario)}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleDelete(funcionario.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mr: 2 }}>
        <Button
          startIcon={<Person />}
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
        >
          Novo funcionario
        </Button>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            width: '400px',
            backgroundColor: '#fff',
            border: '2px solid #000',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            padding: '20px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h6">Novo funcionário</Typography>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={event => setNome(event.target.value)}
          />
          <TextField
            label="Endereço"
            fullWidth
            margin="normal"
            value={endereco}
            onChange={event => setEndereco(event.target.value)}
            error={!endereco}
            helperText={endereco && 'Campo obrigatório'}
          />
          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={telefone}
            onChange={event => setTelefone(event.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Cargo</InputLabel>
            <Select
              value={cargoId || ''}
              onChange={event => setCargoId(event.target.value)}
            >
              {cargos.map(cargo => (
                <MenuItem key={cargo.id_cargo} value={cargo.id_cargo}>
                  {cargo.nome_cargo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default FuncionariosList
