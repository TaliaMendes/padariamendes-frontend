import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography variant="h6">Padaria Mendes</Typography>
        </Box>
        <Box display="flex" justifyContent="center" width="100%">
          <NavLink
            to="/clientes/"
            style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}
          >
            Clientes
          </NavLink>
          <NavLink
            to="/produtos"
            style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}
          >
            Produtos
          </NavLink>
          <NavLink
            to="/pedidos"
            style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}
          >
            Pedidos
          </NavLink>
          <NavLink
            to="/funcionarios"
            style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}
          >
            Funcionários
          </NavLink>
          <NavLink
            to="/cargos"
            style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}
          >
            Cargos
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
