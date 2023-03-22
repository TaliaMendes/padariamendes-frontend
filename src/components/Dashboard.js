import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Clientes from './Clientes'
import Produtos from './Produtos'
import Pedidos from './Pedidos'
import Funcionarios from './Funcionario'
import CargosList from './Cargos'
import Home from './Home'
function Dashboard() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/clientes">
          <Clientes />
        </Route>
        <Route exact path="/produtos">
          <Produtos />
        </Route>
        <Route exact path="/pedidos">
          <Pedidos />
        </Route>
        <Route exact path="/funcionarios">
          <Funcionarios />
        </Route>
        <Route exact path="/cargos">
          <CargosList />
        </Route>
      </Switch>
    </div>
  )
}

export default Dashboard
