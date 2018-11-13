import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './Navbar/Navbar'
import {Container, Row, Button} from 'reactstrap'
import {connect} from 'react-redux';
import Ionicon from 'react-ionicons';
import Rating from '@prontopro/react-rating'
import { Link } from 'react-router-dom'


class Home extends React.Component {

  constructor(props){
    super(props)
    this.state={
      activities:null,
      isLoggedIn: this.props.isLoggedIn,
      userInfos: this.props.user,
      isLoggedIn:this.props.isLoggedIn
    }
  };

componentDidMount(){
  var ctx = this;
  fetch('https://shareandgo-backend.herokuapp.com/')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      ctx.setState({
        activities:data
      })
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
}

  render() {
    return (
      <div>
       <NavBar/>
        <div className="background">
          <div className="homeBackground">
            <div className="textBackground">
              <h1 className="title">Share & Go !</h1>
              <h3 className="subTitle">Partagez vos activités avec notre communauté !</h3>
              <div style={{margin:'auto'}}>
                <Link to="/see-activities"><Button  color="info" className="btn btn-primary" style={{margin:20}}>Voir les activités</Button></Link>
                {this.state.isLoggedIn?(
                  <Link to="/post-activity">
                    <Button  color="primary" className="btn btn-primary">Proposer une activité</Button>
                  </Link>
                ):(
                  <Link to="/connexion-page">
                    <Button  color="primary" className="btn btn-primary">Proposer une activité</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
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
  return { isLoggedIn: store.isLoggedIn, user:store.user }
}

export default connect(
    mapStateToProps,
    null
)(Home);
