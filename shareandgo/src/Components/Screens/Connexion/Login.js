import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Form, Label, Input, FormGroup, Button} from 'reactstrap'
import NavBar from '../Navbar/Navbar'
import {connect} from 'react-redux';


class Login extends React.Component {
constructor(props){
  super(props)
  this.state={
    email:'',
    password:'',
    error:'',
    isLoggedIn:this.props.isLoggedIn,
  }

};


handleSubmit(event){


  event.preventDefault();
  console.log('sent !');
  var ctx = this;
  var email= ctx.state.email;
  var password= ctx.state.password;

  fetch('https://shareandgo-backend.herokuapp.com/post-login', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'email='+email+'&password='+password
})
.then(function(response) {
    return response.json();
  })
  .then(function(user) {
    console.log("retour fetch user ", user);

      if(user.result.length > 0){
        var isLoggedIn = true
        var userInfos = user.result[0];
        console.log(userInfos, 'user infos');
        ctx.props.handleSubmitRedux(isLoggedIn)
        ctx.props.userInfos(userInfos)

      console.log('connecté');
      // this.props.history.goBack();
        ctx.setState({
          email:'',
          password:'',
          isLoggedIn: true,
          error:'',
          })


      }else{
        console.log('non connecté');
        ctx.setState({
          email:'',
          password:'',
          error:'Votre email ou votre mot de passe est érroné',
          isLoggedIn: false
          })
      }
   console.log('request success');
  })
  .catch(function(error) {
    console.log('Request failed', error)
  });
}

  render() {
  console.log(this.state.isLoggedIn, "isLoggedIn???");
console.log('???????????');

    return (
      <div>
      {!this.state.isLoggedIn?(<div style={{marginBottom:100}}>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Adresse email</Label>
                <Input type="email" name="which" id="exampleEmail"  value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})}/>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Mot De Passe</Label>
                <Input type="password" name="which" id="exampleEmail"  value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})}/>
              </FormGroup>
                <Button style={{margin:'auto'}} color="primary" type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Envoyer</Button>
            </Form>
            <span>{this.state.error}</span>
      </div>):(
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
)(Login);
