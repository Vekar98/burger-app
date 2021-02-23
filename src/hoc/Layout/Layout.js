import React, { Component } from 'react';
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
    <Toolbar open={this.sideDrawerOpenHandler} />
    <SideDrawer
     open={this.state.showSideDrawer}
     closed={this.sideDrawerClosedHandler} />
    <main className={classes.Content} >
     {this.props.children}
    </main>
   </Aux>
  );
 }
}

export default Layout;