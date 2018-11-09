import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Form, Label, Input, FormGroup, Button} from 'reactstrap'
import Media from "react-media";
import NavBar from './Navbar/Navbar'
import Login from './Connexion/Login'
import Signup from './Connexion/Signup'
import {connect} from 'react-redux';

class ConnexionPage extends React.Component {
constructor(props){
  super(props)

  this.state={
    connexion:false,
    buttonSwitch:'',
    isLoggedIn: this.props.isLoggedIn

  }

};



switchConnexion= () =>{
  this.setState({
    connexion:!this.state.connexion
  })
}

  render() {
    if (this.state.connexion == false) {
      this.state.buttonSwitch = 'Vous êtes déja inscrit?'
    }else{
      this.state.buttonSwitch = "Vous n'êtes pas encore inscrit?"
    }

    return (
      <div>
        <Container>
         <Row>
         <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'auto', marginBottom:100}}>
         <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
            <h1 style={{marginTop:100, marginBottom:80, textAlign:"center", fontSize:35}}>Connectez-vous pour partager !</h1>):(<h1 style={{marginTop:100, marginBottom:80, textAlign:"center"}}>Connectez-vous pour partager !</h1>)}
          </Media>
           <Form style={{marginLeft:'auto', marginRight:'auto', marginTop:50}}>
         {this.state.connexion? (<Login/>):(<Signup/>)}
         <div style={{display:'flex', marginTop:30, marginLeft:'auto', marginRight:'auto',  justifyContent:'center', alignItems:'center',}}>
           {!this.props.isLoggedIn? (<Button style={{marginRight:'10px'}}color="secondary" className="btn btn-primary" onClick={this.switchConnexion}>{this.state.buttonSwitch}</Button>):(null)}
            <Link to="/"><Button  color="secondary" className="btn btn-primary">Retour</Button></Link>
          </div>
          </Form>
         </div>
         </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoggedIn: store.isLoggedIn, user:store.user }
}

export default connect(
    mapStateToProps,
    null
)(ConnexionPage);
