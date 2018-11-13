import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Container, Row, Form, Label, Input, FormGroup, Button} from 'reactstrap'
import NavBar from '../Navbar/Navbar'
import {connect} from 'react-redux';

class Signup extends React.Component {
constructor(){
  super()
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state={
    email:'',
    passwordOne:'',
    passwordTwo:'',
    userName:'',
    genre:'',
    city:'',
    activities:[]
  }
};

handleSubmit(event){
  event.preventDefault();
  console.log('sent !');
  var ctx = this;
  var email= ctx.state.email;
  var passwordOne= ctx.state.passwordOne;
  var city= ctx.state.city;
  var genre= ctx.state.genre;
  var userName= ctx.state.userName;
  var activities= ctx.state.activities;

  fetch('https://shareandgo-backend.herokuapp.com/post-signup', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'email='+email+'&passwordOne='+passwordOne+'&city='+city+'&genre='+genre+'&userName='+userName+'&activities='+activities
  }).then(function(response) {
      return response.json();
    })
    .then(function(user) {
        if(user){
          var isLoggedIn = true
          var userInfos = user;
          ctx.props.handleSubmitRedux(isLoggedIn)
          ctx.props.userInfos(userInfos)

          ctx.setState({
            email:'',
            password:'',
            isLoggedIn: true,
            error:'',
            })

        }else{
          ctx.setState({
            email:'',
            password:'',
            error:'Votre email ou votre mot de passe est érroné',
            isLoggedIn: false
            })
        }
    })
}

  render() {
    return (
      <div>
      {!this.state.isLoggedIn?(  <Form>
        <div style={{display:'flex', margin:20}}>
        <FormGroup  style={{marginRight:20}} check>
          <Label check>
            <Input type="radio" name="radio1" value={this.state.genre} onChange={(ev)=>this.setState({genre:'femme'})} />
            Femme
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" value={this.state.genre} onChange={(ev)=>this.setState({genre:'homme'})} />
            Homme
          </Label>
        </FormGroup>
        </div>
          <FormGroup>
            <Label for="exampleEmail">Adresse email</Label>
            <Input type="email" name="which" id="exampleEmail"  value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Mot De Passe</Label>
            <Input type="password" name="which" id="exampleEmail"  value={this.state.passwordOne} onChange={(ev)=>this.setState({passwordOne:ev.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Nom d'utilisateur</Label>
            <Input type="text" name="which" id="exampleEmail"  value={this.state.userName} onChange={(ev)=>this.setState({userName:ev.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Activités Favorites</Label>
            <Input type="text" name="which" id="exampleEmail"  value={this.state.activities} onChange={(ev)=>this.setState({activities:ev.target.value})}/>
          </FormGroup>
          <Button style={{margin:'auto'}} color="primary" type="submit" onClick={this.handleSubmit} className="btn btn-primary">Envoyer</Button>
        </Form>):(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <h3 style={{textAlign:'center'}}>Félicitations vous êtes désormais connecté ! Vous pouvez maintenant :</h3>
          <div style={{margin:'auto'}}>
            <Link to="/see-activities"><Button  color="info" className="btn btn-primary" style={{margin:20}}>Voir les activités</Button></Link>
            <Link to="/post-activity"><Button  color="primary" className="btn btn-primary">Proposer une activité</Button></Link>
          </div>
        </div>
      )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmitRedux: function(isLoggedIn) {
        dispatch( {type: 'login', isLoggedIn:isLoggedIn } )
    },
    userInfos: function(user) {
        dispatch( {type: 'user', user:user} )
    }
  }
}

function mapStateToProps(store) {
  return { isLoggedIn: store.isLoggedIn, user:store.user }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
