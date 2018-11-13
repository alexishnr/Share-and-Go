import React from 'react';
import {Container, Row, Form, Label, Input, FormGroup, Button, Col} from 'reactstrap'
import NavBar from './Navbar/Navbar';
import Activity from './activity'
import {connect} from 'react-redux';
import Media from "react-media";
import { Alert } from 'reactstrap';
require('bootstrap/dist/css/bootstrap.css');


class MyActivities extends React.Component {
constructor(){
  super()
  this.state={
  activities:[],
  searchTheme:'',
  searchDepartement:'',
  }
};

  componentDidMount(){

    var ctx = this;        fetch('https://shareandgo-backend.herokuapp.com/get-like-activity', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'user_id='+ctx.props.user._id
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState({
        activities:data
      })
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

      onChangeTheme = e =>{
        this.setState({
          searchTheme: e.target.value
        })
      }

      onChangePlace = e =>{
        this.setState({
          searchDepartement: e.target.value
        })
      }

  render() {
    const searchList = this.state.activities.filter((activities) =>{
      return activities
    })

    if (this.state.activities.length < 1) {
      var addActivity = 'Ajoutez des activités pour les retrouver dans vos favoris.'
    }

    if (searchList.length > 0) {
      var isOpen = false
    }

    return (
      <div>
       <NavBar/>
         <Container>
         <div>
            <Media query="(max-width: 599px)">
              {matches =>
                matches ? (
                <h1 style={{marginTop:100, marginBottom:80, textAlign:"center", fontSize:35}}>Mes activités favorites</h1>):(<h1 style={{marginTop:100, marginBottom:80, textAlign:"center"}}>Mes activités favorites</h1>)}
            </Media>
            <Media query="(max-width: 599px)">
              {matches =>
                matches ? (
                <h3 style={{marginTop:100, marginBottom:80, textAlign:"center", fontSize:20}}>{addActivity}</h3>):(
                <h3 style={{marginTop:100, marginBottom:80, textAlign:"center"}}>{addActivity}</h3>)}
            </Media>
            <Row>
              {searchList.map((activities)=> {
                return <Activity activityDate={activities.activityDate} activityName={activities.activityName} activityTheme={activities.activityTheme} activityMembers={activities.activityMembers} activityId={activities.activityId} activityResume={activities.activityResume} activityPlace={activities.activityPlace}
                activityId={activities._id}
                activityCommentaires={activities.activityCommentaires}
                allActivity={activities}
                isLoggedIn={this.props.isLoggedIn} activityLiked={activities.numberLike} activityAuthor={activities.author} activityPrice={activities.activityPrice}/>
                 }
                )
              }
            </Row>
          </div>
          </Container>
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
)(MyActivities);
