import { useEffect, useState } from 'react'
import api from '../services/api'
import FaturamentoCard from './Faturamento'
import TotalClientesCard from './TotalClientes'
import TotalSalarioCard from './TotalSalario'
import TotalFuncionarios from './CountFuncionarios'
import {
  ButtonGroup,
  Button,
  Paper,
  Stack,
  Typography,
  Chip
} from '@mui/material'

export default function Home() {
  const [totalSalario, setTotalSalario] = useState(0)
  const [faturamento, setFaturamento] = useState(0)

  useEffect(() => {
    async function fetchSalario() {
      const response = await api.get('/salario')
      setTotalSalario(response.data[0].total_salario)
    }

    async function fetchFaturamento() {
      const response = await api.get('/faturamento')
      setFaturamento(response.data.total_faturado)
    }

    fetchSalario()
    fetchFaturamento()
  }, [])
  const status =
    parseFloat(faturamento) === parseFloat(totalSalario)
      ? 'Estável'
      : parseFloat(faturamento) > parseFloat(totalSalario)
      ? 'Ótimo'
      : 'Crítico'

  const color =
    status === 'Estável' ? 'success' : status === 'Ótimo' ? 'succcess' : 'error'

  return (
    <Stack direction="column" spacing={3} mt={5} ml={2} justifyContent="center">
      <Paper elevation={3} square>
        <ButtonGroup fullWidth>
          <Button variant="contained">Saúde financeira</Button>
        </ButtonGroup>
        <Stack alignItems="center" textAlign="center" mt={2}>
          Status da empresa:
          <Chip label={status} color={color} sx={{ mb: 2, width: '200px' }} />
        </Stack>
      </Paper>
      <Paper elevation={3} square>
        <ButtonGroup fullWidth>
          <Button variant="contained">Financeiro</Button>
        </ButtonGroup>
        <Stack
          direction="row"
          spacing={3}
          mt={1}
          ml={2}
          p={2}
          justifyContent="center"
        >
          <FaturamentoCard />
          <TotalClientesCard />
        </Stack>
      </Paper>

      <Paper elevation={3} square>
        <ButtonGroup fullWidth>
          <Button variant="contained">Dados empresa</Button>
        </ButtonGroup>
        <Stack
          direction="row"
          spacing={3}
          mt={1}
          ml={2}
          p={2}
          justifyContent="center"
        >
          <TotalSalarioCard />
          <TotalFuncionarios />
        </Stack>
      </Paper>
    </Stack>
  )
}
