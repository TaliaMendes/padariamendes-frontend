import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <Router>
      <Route path="/">
        <Dashboard />
      </Route>
    </Router>
  )
}

export default App
