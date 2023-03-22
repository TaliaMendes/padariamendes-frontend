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
function FaturamentoCard() {
  const [totalFaturamento, setTotalFaturamento] = useState(0)

  useEffect(() => {
    async function fetchFaturamento() {
      const response = await api.get('/faturamento')

      setTotalFaturamento(response.data.total_faturado)
    }

    fetchFaturamento()
  }, [])

  return (
    <Paper sx={{ paddingTop: 0, width: '300px' }} elevation={3} square>
      <Typography variant="h5" component="h2">
        <ButtonGroup fullWidth>
          <Button variant="contained" endIcon={<AttachMoney />}>
            Faturamento
          </Button>
        </ButtonGroup>
      </Typography>
      <Typography textAlign="center" variant="h6" component="p" sx={{ mt: 2 }}>
        R$ {totalFaturamento}
      </Typography>
    </Paper>
  )
}

export default FaturamentoCard
