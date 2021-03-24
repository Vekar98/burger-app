import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

 state = {
  showSideDrawer: false
 }

 sideDrawerClosedHandler = () => {
  this.setState({ showSideDrawer: false });
 }

 sideDrawerOpenHandler = () => {
  this.setState({ showSideDrawer: true });
 }

 render() {
  return (
   <Aux>
    <Toolbar
     isAuth={this.props.isAuthenticated}
     open={this.sideDrawerOpenHandler} />
    <SideDrawer
     isAuth={this.props.isAuthenticated}
     open={this.state.showSideDrawer}
     closed={this.sideDrawerClosedHandler} />
    <main className={classes.Content} >
     {this.props.children}
    </main>
   </Aux>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  isAuthenticated: state.auth.token !== null
 }
}

export default connect(mapStateToProps)(Layout);