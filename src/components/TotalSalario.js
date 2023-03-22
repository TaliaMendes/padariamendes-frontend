import React, { useEffect, useState } from 'react'
import {
  Card,
  Icon,
  CardContent,
  Typography,
  Paper,
  ButtonGroup,
  Button
} from '@mui/material'
import { AttachMoney } from '@mui/icons-material'
import api from '../services/api'
function SalarioCard() {
  const [totalFaturamento, setTotalFaturamento] = useState(0)

  useEffect(() => {
    async function fetchSalario() {
      const response = await api.get('/salario')
      setTotalFaturamento(response.data[0].total_salario)
    }

    fetchSalario()
  }, [])

  return (
    <Paper sx={{ paddingTop: 0, width: '300px' }} elevation={3} square>
      <Typography variant="h5" component="h2">
        <ButtonGroup fullWidth>
          <Button variant="contained" endIcon={<AttachMoney />}>
            Salário a pagar
          </Button>
        </ButtonGroup>
      </Typography>
      <Typography textAlign="center" variant="h6" component="p" sx={{ mt: 2 }}>
        R$ {totalFaturamento}
      </Typography>
    </Paper>
  )
}

export default SalarioCard
