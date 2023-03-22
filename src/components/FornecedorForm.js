import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core'

const FornecedorDialog = ({
  open,
  handleClose,
  handleSave,
  fornecedor = null
}) => {
  const [nome, setNome] = useState(fornecedor?.nome || '')
  const [endereco, setEndereco] = useState(fornecedor?.endereco || '')
  const [telefone, setTelefone] = useState(fornecedor?.telefone || '')

  const handleNomeChange = event => {
    setNome(event.target.value)
  }

  const handleEnderecoChange = event => {
    setEndereco(event.target.value)
  }

  const handleTelefoneChange = event => {
    setTelefone(event.target.value)
  }

  const handleSaveClick = () => {
    const data = { nome, endereco, telefone }
    if (fornecedor) {
      handleSave(fornecedor.id, data)
    } else {
      handleSave(null, data)
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{fornecedor ? 'Editar' : 'Novo'} Fornecedor</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          fullWidth
          value={nome}
          onChange={handleNomeChange}
          margin="normal"
        />
        <TextField
          label="Endereço"
          fullWidth
          value={endereco}
          onChange={handleEnderecoChange}
          margin="normal"
        />
        <TextField
          label="Telefone"
          fullWidth
          value={telefone}
          onChange={handleTelefoneChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FornecedorDialog
