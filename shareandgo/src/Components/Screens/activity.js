import React from 'react';
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input, CardImg, CardTitle, CardText, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Alert, CardSubtitle   } from 'reactstrap'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import Media from "react-media";
import Ionicon from 'react-ionicons';
import Rating from '@prontopro/react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons'
require('bootstrap/dist/css/bootstrap.css');
var moment = require('moment');


class Activity extends React.Component {
constructor(props){
  super(props)
  this.state={
  activities:[],
  seeMoreText:false,
  seeMoreTextButton:'',
  isOpenRating: false,
  writeAComment:true,
  commentaire:'',
  commentairesList: this.props.activityCommentaires,
  isLoggedIn:this.props.isLoggedIn,
  allActivity:this.props.allActivity,
  like: false,
  commentEmpty:true,
  isLikedHeart: false,
  Picture:'',
  activityLiked: this.props.activityLiked
  }
};

componentDidMount(){
 var ctx = this;
 fetch('https://shareandgo-backend.herokuapp.com/isLiked-activity', {
 method: 'POST',
 headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'activity_id='+ctx.props.activityId+'&user_id='+ctx.props.user._id
  })
  .then(function(response) {
    return response.json();
    console.log('retour reponse like');
  })
  .then(function(data) {
    ctx.setState({
      isLikedHeart:data
    })

  })
  .catch(function(error) {
    console.log('Request failed', error)
  });

  var Picture;
  if (this.props.activityTheme == 'Voyage') {
    this.setState({Picture : 'Voyage.jpg'})
  }else if (this.props.activityTheme == 'Sport') {
    this.setState({Picture : 'Sport.jpg'})
  }else if (this.props.activityTheme == 'Culture') {
    this.setState({Picture : 'Culture.jpg'})
  }else if (this.props.activityTheme == 'Bien-être') {
    this.setState({Picture : 'Bien-être.jpg'})
  }else if (this.props.activityTheme == 'Découverte') {
    this.setState({Picture : 'Découverte.jpg'})
  }else if (this.props.activityTheme == 'Food') {
    this.setState({Picture : 'Food.jpg'})
  }else if (this.props.activityTheme == 'Soirées') {
    this.setState({Picture : 'Soirées.jpg'})
  }else if (this.props.activityTheme == 'Spectacles') {
    this.setState({Picture : 'Spectacles.jpg'})
  }else{
    this.setState({Picture : 'Food.jpg'})
  }
}

toggle() {
   this.setState({
     modal: !this.state.modal
   });
 }

 cancelComment() {
    this.setState({
      writeAComment: !this.state.writeAComment
    });
  }

  seeMoreTextButton(){
  this.setState({
    seeMoreText:!this.state.seeMoreText
  })
}

writeAComment(){
  this.setState({
      writeAComment: !this.state.writeAComment
    })
  }
    likeActivity(){

      this.setState({
        activityLiked : this.state.activityLiked+1
      })
      this.setState({
        like:!this.state.like,
        isLikedHeart: !this.state.isLikedHeart
      })
      console.log(this.props.allActivity, 'all');
      var ctx = this;

      fetch('https://shareandgo-backend.herokuapp.com/like-activity', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'activity_id='+ctx.props.activityId+'&user_id='+ctx.props.user._id
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.setState({
        })
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });

    }

    dislikeActivity(){

    this.setState({
      activityLiked : this.state.activityLiked-1
    })

      var ctx = this;
      ctx.setState({isLikedHeart: !ctx.state.isLikedHeart})

      fetch('https://shareandgo-backend.herokuapp.com/dislike-activity', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'activity_id='+ctx.props.activityId+'&user_id='+ctx.props.user._id
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data, 'data result');
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });

    }


    sendAComment(){
      console.log('comment sent');
    var nowBid = moment().format('MMMM Do YYYY, h:mm:ss a');

    var infoComment = {commentaire : this.state.commentaire,
      username : this.state.username, date:nowBid
    }


    console.log('sent !');
    var ctx = this;
    var commentaire= ctx.state.commentaire;
    var _id= ctx.props.activityId;

    fetch('https://shareandgo-backend.herokuapp.com/post-commentaires', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: 'commentaire='+commentaire+'&date='+nowBid+'&username='+ctx.props.user.userName+'&_id='+_id
    })
    .then(function(response) {
      return response.json();
      console.log('retour fetch');
    })
    .then(function(data) {
      console.log(data, 'test ici');
      ctx.setState({
        commentairesList:data.activities.activityCommentaires,
      })
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    ctx.setState({
      commentaire:'',
      writeAComment: !this.state.writeAComment
    })
  }


  render() {
    console.log('log', this.state.isLoggedIn);
    console.log('username', this.props.user);

    if (this.state.isLikedHeart == true) {
      var colorLike={
        color:"red",
        fontSize:30,
        position:'absolute',
        top:25,
        right:25
      }
    }else {
      var colorLike={
        fontSize:30,
        position:'absolute',
        top:25,
        right:25
      }
    }

    var showRatingSection;
        if (this.state.writeAComment == true) {
          showRatingSection={
            display: 'none',
          }
        }

    if (this.state.seeMoreText === false) {
    this.state.seeMoreTextButton = 'Voir plus'
  }else {
    this.state.seeMoreTextButton = 'Voir moins'

  }

  var listComment=[];
  for (var i = 0; i < this.state.commentairesList.length; i++) {
    listComment.push(<div style={{margin:10, flexDirection:'column'}}>
    <span style={{fontSize:13}}>
     {this.state.commentairesList[i].date}
    </span>
    <h5>
    {this.state.commentairesList[i].username}
    </h5>
    <span style={{fontSize:16}}>
    {this.state.commentairesList[i].commentaire}
    </span>
    <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'40px'}}>
    </div>
    </div>)
    }
    console.log(this.state.commentairesList,'listComment');

    const isInvalid =
      this.state.commentaire === '' ||
      this.state.username === '';

      if (this.state.commentEmpty == true) {
        var empty = "Soyez le premier à écrire un commentaire !"
      }

      console.log('heart', this.state.isLikedHeart);



    return (

      <Col xs="12" sm="6" md = "4">
        <Card style={{marginBottom:30}}>
        <CardImg  style={{height:232, width:348}} top  src={"./images/"+this.state.Picture} alt="Card image cap" />
          <CardBody style={{marginRight:'auto', marginLeft:'auto', display:'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
            <CardTitle style={{fontSize:25, marginBottom:0, alignItems:'center'}}>{this.props.activityTheme}</CardTitle>
            <div style={{border: "0.5px solid #D8D8D8", width: 150, margin:'auto', opacity:'0.6', marginTop:'5px', marginBottom:'30px'}}></div>
            <CardSubtitle style={{marginBottom:13, fontSize:18, whiteSpace:'noWrap'}}>🤼 {this.props.activityName}</CardSubtitle>
            <CardSubtitle style={{marginBottom:13, fontSize:18, whiteSpace:'noWrap'}}>📅 {this.props.activityDate}</CardSubtitle>
            <CardSubtitle style={{marginBottom:20, fontSize:18, whiteSpace:'noWrap'}}>🏟️  {this.props.activityPlace}</CardSubtitle>
            <CardSubtitle style={{marginBottom:20, fontSize:18, whiteSpace:'noWrap'}}>❤️ {this.state.activityLiked} like(s) </CardSubtitle>
            {this.props.isLoggedIn? (<Button  color="info" style={{ maxWidth:'285px', fontSize:'15px', margin: "auto"}}  onClick={this.toggle.bind(this)}>Voir plus</Button>): ( <Link to="/connexion-page"><Button  color="secondary" style={{ maxWidth:'285px', fontSize:'15px', margin: "auto"}} >Se connecter pour voir plus</Button></Link>)}
           </CardBody>
        </Card>
        <Modal style={modalStyle} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                     <ModalHeader style={{margin:'auto', display:'row', alignItems:'center', justifyContent: 'center'}} toggle={this.toggle}>
                       <h1 style={{ fontSize:'40px'}}>{this.props.activityName}</h1>
                       <h3 style={{ fontSize:'20px', textAlign:'center'}}>{this.props.activityTheme}</h3>
                       {!this.state.isLikedHeart? (<FontAwesomeIcon  onClick={this.likeActivity.bind(this)} style={colorLike} icon={faHeart} />) : (<FontAwesomeIcon  onClick={this.dislikeActivity.bind(this)} style={colorLike} icon={faHeart} />) }
                     </ModalHeader>
                     <ModalBody style={cardText}>
                          <Container>
                          <div style={{width: '90%', marginLeft:'auto', marginRight:'auto', display:'row', justifyContent:'center', textAlign:'center'}}>
                          {this.state.seeMoreText ? ( <CardText style={cardVilleMobile}>{this.props.activityResume}</CardText>
                          ) : (
                            <CardText style={cardVilleMobile}>{this.props.activityResume.substr(0, 200)+'...'}</CardText>
                          ) }
                          <Button color="info" onClick={this.seeMoreTextButton.bind(this)}>{this.state.seeMoreTextButton}</Button>
                 <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'40px'}}></div>
                 <div style={center}>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}> 🤼 Activité : {this.props.activityName}</span></CardText>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}> Thème de l'activité : {this.props.activityTheme}</span></CardText>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}> 📅 Date de l'activité : {this.props.activityDate}</span></CardText>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}> 🏟️ Lieu de l'activité : {this.props.activityPlace}</span></CardText>
                      <CardText style={cardWebsite}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}>✏️ Publié par : {this.props.activityAuthor}</span></CardText>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}>💰 Prix : {this.props.activityPrice} €</span></CardText>
                      <CardText style={cardVille}>
                      <span style={{marginRight:'10px', whiteSpace:'noWrap'}}>👥 Nombre de participants max. : {this.props.activityMembers}</span><br/></CardText>
                  </div>
                      <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'30px'}}></div>
                  <div>
                  {this.state.writeAComment ? (
                    <div>
                    <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Commentaires</label>
                    <div style={{height:'200px', overflow:'scroll', border: "1px solid #D8D8D8", borderRadius: '5px', padding:'5px', width: '90%', margin:'auto'}}>
                      {listComment.reverse()}</div></div>
                    ) : (
                    <div className="form-group" style={{display:'flex', alignItems:'center', justifyContent:'center', margin: 'auto', width:'50%', flexDirection:'column'}}>
                      <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Envoyer un commentaire</label>
                      <textarea type="text" value={this.state.commentaire} onChange={(ev)=>this.setState({commentaire:ev.target.value})} className="form-control" id="message-text">
                      </textarea>
                    </div>
                  )}
                  </div>
                  </div>
                </Container>
              </ModalBody>
              <ModalFooter>
                {this.state.writeAComment? ( <Button color="info" onClick={this.writeAComment.bind(this)}> Rédiger un commentaire</Button>)
               :
               ( <div><Button color="primary" onClick={this.sendAComment.bind(this)}> Envoyer</Button> </div>)}
                  <Button color="secondary" onClick={this.toggle.bind(this)}>Retour</Button>
              </ModalFooter>
            </Modal>
      </Col>

    );
  }
}

var cardStyle ={
  Width: '300px',
  marginTop: '50px',
}
var cardTitle ={
  fontSize:'30px',
  color:'#353A3F',
  textTransform: 'capitalize'
}
var cardCompetence ={
  fontSize:'25px',
  color:'#353A3F',
  textTransform: 'capitalize'
}
var cardVille ={
  fontSize:'19px',
  color:'#353A3F',
  // textTransform: 'capitalize',
  marginRight:'10px'
}
var cardVilleMobile ={
  fontSize:'17px',
  color:'#353A3F',
  marginRight:'10px',
  margin:40
}
var cardWebsite ={
  fontSize:'19px',
  color:'#353A3F',
}
var cardText ={
  color:'#353A3F',
}
var cardImg ={
  width: '318px',
  height: '180px',
}
var modalStyle ={
  minWidth: '98%',
  width: '90%',
  height: '100%',
  minHeight: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
}
var modalStyleMobile ={
  maxWidth: '2000px',
  width: '100%',
  height: '100%',
  margin:'auto'
}
var center ={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'column'
}


function mapStateToProps(store) {
  return { isLoggedIn: store.isLoggedIn, user:store.user }
}

export default connect(
    mapStateToProps,
    null
)(Activity);
