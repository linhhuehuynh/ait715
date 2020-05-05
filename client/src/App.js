import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';
import RequestItemList from './components/RequestItemList';
import ItemModal from './components/itemModal';
import RequestItemModal from './components/requestItemModal';
import Intro from './components/Intro';
import { Container, Navbar } from 'reactstrap';
import { loadUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  componentDidMount() {

    //dispatch trigger a state change
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Intro />
            <ItemModal />
            <RequestItemModal />
            <RequestItemList />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
