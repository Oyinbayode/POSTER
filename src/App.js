import './App.scss';
import {withRouter, Switch, Route} from 'react-router-dom'
import Home from './Components/Home'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default withRouter(App);
