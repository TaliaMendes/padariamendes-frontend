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

function TotalFuncionarios() {
  const [totalFuncionarios, setTotalFuncionarios] = useState(0)

  useEffect(() => {
    async function fetchFuncionarios() {
      const response = await api.get('/totalFuncionarios')
      console.log(response)
      setTotalFuncionarios(response.data[0].total_funcionarios)
    }

    fetchFuncionarios()
  }, [])

  return (
    <Paper sx={{ paddingTop: 0, width: '300px' }} elevation={3} square>
      <ButtonGroup fullWidth>
        <Button variant="contained" endIcon={<Person />}>
          funcionarios
        </Button>
      </ButtonGroup>

      <Typography textAlign="center" variant="h6" component="p" sx={{ mt: 2 }}>
        {totalFuncionarios}
      </Typography>
    </Paper>
  )
}

export default TotalFuncionarios
