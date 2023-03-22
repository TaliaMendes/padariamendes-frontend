import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Icon,
  Paper,
  ButtonGroup,
  Button
} from '@mui/material'
import { Person } from '@mui/icons-material'
import api from '../services/api'

function TotalClientesCard() {
  const [totalClientes, setTotalClientes] = useState(0)

  useEffect(() => {
    async function fetchClientes() {
      const response = await api.get('/totalClientes')
      setTotalClientes(response.data.total_clientes)
    }

    fetchClientes()
  }, [])

  return (
    <Paper sx={{ paddingTop: 0, width: '300px' }} elevation={3} square>
      <ButtonGroup fullWidth>
        <Button variant="contained" endIcon={<Person />}>
          Total Clientes
        </Button>
      </ButtonGroup>

      <Typography textAlign="center" variant="h6" component="p" sx={{ mt: 2 }}>
        {totalClientes}
      </Typography>
    </Paper>
  )
}

export default TotalClientesCard
