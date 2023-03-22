import React from 'react'
import { Link } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Storage as StorageIcon
} from '@mui/icons-material'

export default function Sidebar() {
  return (
    <Drawer open variant="permanent">
      <List>
        <ListItem omponent={Link} to="/clientes">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
        <ListItem component={Link} to="/produtos">
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Produtos" />
        </ListItem>
        <ListItem component={Link} to="/pedidos">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Pedidos" />
        </ListItem>
      </List>
    </Drawer>
  )
}
