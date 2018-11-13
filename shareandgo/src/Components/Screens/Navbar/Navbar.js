import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoggedIn:this.props.isLoggedIn
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout(){
    var ctx = this;
    fetch('https://shareandgo-backend.herokuapp.com/logout', {
  })
    .then(function(response) {
        return response.json();
      })
    .then(function(isLoggedIn) {
      ctx.props.logoutSubmitRedux(isLoggedIn)

      ctx.setState({
      isLoggedIn: true
      })
    })
      .catch(function(error) {
        console.log('Request failed', error)
      });
  }

  render() {
    return (
      <div>
          <Navbar color="dark" light expand="md" className="navbar">
            <Link style={{ textDecoration:'none', color:"#fff"}} to="/">
              <NavbarBrand className="navbar">Share & Go !</NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="navbar" nav caret>
                  Mon Compte
                </DropdownToggle>
                <DropdownMenu right>
                  {this.state.isLoggedIn? (<div><Link style={{ textDecoration:'none', color:"#fff"}} to="/update-account"><DropdownItem>Modifier mes informations</DropdownItem></Link>
                  <DropdownItem divider /></div>):(null)}
                  {!this.state.isLoggedIn? (
                    <Link style={{ textDecoration:'none', color:"#fff"}} to="/connexion-page"><DropdownItem>Se connecter</DropdownItem></Link>):   (<Link style={{ textDecoration:'none', color:"#fff"}} to="/my-activities"><DropdownItem>Se déconnecter</DropdownItem></Link>)}
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem>
                {!this.state.isLoggedIn? (
                  <Link style={{ textDecoration:'none', color:"#fff"}} to="/connexion-page"><NavLink className="navbar" >Mes Activités</NavLink></Link>):(<Link style={{ textDecoration:'none', color:"#fff"}} to="/my-activities"><NavLink className="navbar" >Mes Activités</NavLink></Link>)
                }
                </NavItem>
                <NavItem>
                  {this.props.isLoggedIn? (
                      <NavLink className="navbar" onClick={this.logout.bind(this)}>Déconnexion</NavLink>
                  ) : (
                    <NavLink className="navbar"><Link style={{ textDecoration:'none', color:"#fff"}} to="/connexion-page">Connexion</Link></NavLink>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoggedIn: store.isLoggedIn }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutSubmitRedux: function(isLoggedIn) {
        dispatch( {type: 'logout', isLoggedIn:isLoggedIn } )
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
