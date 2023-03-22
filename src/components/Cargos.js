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
  Modal,
  Stack,
  Paper,
  ButtonGroup,
  IconButton
} from '@mui/material'
import { Delete, Edit, Work } from '@mui/icons-material'
import api from '../services/api'

export default function CargosList() {
  const [cargos, setCargos] = useState([])
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [cargoId, setCargoId] = useState(null)
  const [salario, setSalario] = useState('')
  useEffect(() => {
    async function fetchCargos() {
      const response = await api.get('/cargos')
      setCargos(response.data)
    }
    fetchCargos()
  }, [])

  console.log(cargos)

  const handleOpen = cargo => {
    setOpen(true)
    setCargoId(cargo.id_cargo)
    setNome(cargo.nome_cargo)
    setDescricao(cargo.descricao_cargo)
    setSalario(cargo.salario_cargo)
  }

  const handleClose = () => {
    setOpen(false)
    setCargoId(null)
    setNome('')
    setDescricao('')
    setSalario('')
  }

  const handleAdd = () => {
    const cargo = {
      nome_cargo: nome,
      descricao_cargo: descricao,
      salario_cargo: salario
    }
    api.post('/cargos', cargo).then(() => {
      api.get('/cargos').then(response => {
        setCargos(response.data)
      })
    })
    handleClose()
  }

  const handleEdit = () => {
    const cargo = {
      nome_cargo: nome,
      descricao_cargo: descricao,
      salario_cargo: salario
    }
    api.put(`/cargos/${cargoId}`, cargo).then(() => {
      api.get('/cargos').then(response => {
        setCargos(response.data)
      })
    })
    handleClose()
  }

  const handleDelete = id => {
    api.delete(`/cargos/${id}`).then(() => {
      api.get('/cargos').then(response => {
        setCargos(response.data)
      })
    })
  }

  return (
    <>
      <Paper elevation={2} sx={{ mt: 2, mr: 1, ml: 2 }}>
        <ButtonGroup
          fullWidth
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Cargos</Button>
        </ButtonGroup>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Salário</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(cargos) > 0 &&
              cargos.map(cargo => (
                <TableRow key={cargo.id_cargo}>
                  <TableCell>{cargo.nome_cargo}</TableCell>
                  <TableCell>{cargo.descricao_cargo}</TableCell>
                  <TableCell>{cargo.salario_cargo}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => handleOpen(cargo)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => handleDelete(cargo.id_cargo)}
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
          startIcon={<Work />}
          onClick={() => handleOpen({})}
          variant="contained"
          color="primary"
        >
          Novo cargo
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
          <Typography variant="h6">
            {cargoId ? 'Editar cargo' : 'Novo cargo'}
          </Typography>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={event => setNome(event.target.value)}
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
          />
          <TextField
            label="Salário"
            fullWidth
            margin="normal"
            value={salario}
            onChange={event => setSalario(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={cargoId ? handleEdit : handleAdd}
          >
            Salvar
          </Button>
        </div>
      </Modal>
    </>
  )
}
