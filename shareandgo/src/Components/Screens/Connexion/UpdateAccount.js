import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Form, Label, Input, FormGroup, Button, Col} from 'reactstrap'
import NavBar from '../Navbar/Navbar'
import {connect} from 'react-redux';

class UpdateAccount extends React.Component {
constructor(props){
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state={
    email:this.props.user.email,
    passwordOne:this.props.user.password,
    passwordTwo:'',
    userName:this.props.user.userName,
    genre:this.props.user.genre,
    city:this.props.user.city,
    activities:this.props.user.activities,
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

  fetch('https://shareandgo-backend.herokuapp.com/update-account', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'email='+email+'&passwordOne='+passwordOne+'&city='+city+'&genre='+genre+'&userName='+userName+'&activities='+activities
})
ctx.setState({
  email:'',
  passwordOne:'',
  city:'',
  genre:'',
  userName:'',
  activities:''
})
}

  render() {
    console.log(this.props.user, 'user account');
    return (
      <div>
      <NavBar/>
           <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'auto', marginBottom:100}} >
           <h1 style={{marginLeft:'auto', marginRight:'auto', marginTop:50, marginBottom:80}}>Modifiez vos informations personnelles </h1>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Adresse email</Label>
                      <Input style={inputStyle} type="email" name="which" id="exampleEmail"  value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Mot De Passe</Label>
                      <Input  type="password" name="which" id="exampleEmail"  value={this.state.passwordOne} onChange={(ev)=>this.setState({passwordOne:ev.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Nom d'utilisateur</Label>
                      <Input style={inputStyle} type="text" name="which" id="exampleEmail"  value={this.state.userName} onChange={(ev)=>this.setState({userName:ev.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Ville</Label>
                      <Input style={inputStyle} type="text" name="which" id="exampleEmail"  value={this.state.city} onChange={(ev)=>this.setState({city:ev.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Activités Favorites</Label>
                      <Input style={inputStyle} type="text" name="which" id="exampleEmail"  value={this.state.activities} onChange={(ev)=>this.setState({activities:ev.target.value})}/>
                    </FormGroup>
                    <Button style={{margin:'auto'}} color="primary" type="submit" onClick={this.handleSubmit} className="btn btn-primary">Envoyer</Button>
                  </Form>
              </div>
              <div className="footer">
                <div class="column width-12 center">
                 <h4 className="titleFooter1">Merci d'avoir visité mon site web fictif.</h4>
               </div>
               <div>
                 <span className="titleFooter">Share & Go</span>
               </div>
             </div>
      </div>


    );
  }
}

function mapStateToProps(store) {
  console.log(store.user, 'store user');
  return { isLoggedIn: store.isLoggedIn, user:store.user }
}

export default connect(
    mapStateToProps,
    null
)(UpdateAccount);

var inputStyle={
  width:200
}
