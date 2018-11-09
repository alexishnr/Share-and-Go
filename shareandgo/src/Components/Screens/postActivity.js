import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Form, Label, Input, FormGroup, Button} from 'reactstrap'
import NavBar from './Navbar/Navbar'
import ConnexionPage from './ConnexionPage'
import {connect} from 'react-redux';
import Media from "react-media";
import axios from 'axios';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom'


class PostForm extends React.Component {
constructor(props){
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state={
    activityName:"",
    activityTheme:"",
    activityDate:"",
    activityMembers:"",
    activityPlace:"",
    activityResume:"",
    activityPrice:"",
    activityDepartement:"",
    activityPicture: null,
    isLoggedIn:this.props.isLoggedIn,
    isOpen:false
  }
};



handleSubmit(event){
  event.preventDefault();
  console.log('sent !');
  var ctx = this;
  var activityName= ctx.state.activityName;
  var activityTheme= ctx.state.activityTheme;
  var activityDate= ctx.state.activityDate;
  var activityPlace= ctx.state.activityPlace;
  var activityMembers= ctx.state.activityMembers;
  var activityPrice= ctx.state.activityPrice;
  var activityResume= ctx.state.activityResume;
  var activityPicture= ctx.state.activityPicture;
  var activityDepartement= ctx.state.activityDepartement;


  fetch('https://shareandgo-backend.herokuapp.com/post-activity', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'activityName='+activityName+'&activityTheme='+activityTheme+'&activityDate='+activityDate+'&activityPlace='+activityPlace+'&activityMembers='+activityMembers+'&author='+ctx.props.user.userName+'&activityPrice='+activityPrice+'&activityResume='+activityResume+'&activityDepartement='+activityDepartement
})

    ctx.setState({isOpen:true})

}


  render() {
    console.log(this.state.isLoggedIn,'signup isLoggedIn?');

    console.log(this.state.activityPicture, 'pictuuuuuure ###############');
    return (

      <div>
      {this.state.isLoggedIn?(
        <div>
       <NavBar/>
       <div className="background2" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'auto'}} >
       </div>
        <Container>
         <Row>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'auto'}} >
          {this.state.isLoggedIn ? (
            <div style={{marginBottom:100}}>
            <Media query="(max-width: 599px)">
             {matches =>
               matches ? (
               <h1 style={{marginTop:100, marginBottom:80, textAlign:"center", fontSize:35}}>Partagez votre activité à la communauté !</h1>):(<h1 style={{marginTop:100, marginBottom:80, textAlign:"center"}}>Partagez votre activité à la communauté !</h1>)}
             </Media>
            <Form style={{marginLeft:'auto', marginRight:'auto', marginTop:50, alignItems:'center', display:'flex', flexDirection:'column'}}>
            <FormGroup>
              <Label for="exampleEmail">Que souhaitez vous proposer?</Label>
              <Input type="text" name="which" id="exampleEmail" placeholder="Entrez le nom de l'activité ..." value={this.state.activityName} onChange={(ev)=>this.setState({activityName:ev.target.value})} style={{width:350}}/>
            </FormGroup>
            <FormGroup>
             <Label style={{width:350}} for="exampleSelect">Quel est le thème de l'activité?</Label>
             <Input type="select" name="select" id="exampleSelect" onChange={(ev)=>this.setState({activityTheme:ev.target.value})}>
               <option>Sélectionnez un thème ..</option>
               <option>Food & Drink</option>
               <option>Soirées</option>
               <option>Voyage</option>
               <option>Bien-être</option>
               <option>Culture</option>
               <option>Sport</option>
               <option>Spectacles</option>
               <option>Découverte</option>
             </Input>
           </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Quand?</Label>
              <Input type="text" name="which" id="exampleEmail" placeholder="Entrez la date de l'activité ..." value={this.state.activityDate} onChange={(ev)=>this.setState({activityDate:ev.target.value})} style={{width:350}}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Où?</Label>
              <Input type="text" name="which" id="exampleEmail" placeholder="Entrez le lieu de l'activité ..." value={this.state.activityPlace} onChange={(ev)=>this.setState({activityPlace:ev.target.value})} style={{width:350}}/>
            </FormGroup>
            <FormGroup>
             <Label for="exampleSelect">Quel département?</Label>
             <Input type="select" name="select" id="exampleSelect" style={{width:350}} onChange={(ev)=>this.setState({activityDepartement:ev.target.value})}>
               <option>Selectionnez un département ..</option>
               <option>01 - Ain</option>
               <option>02 - Aisne </option>
               <option>03 - Allier</option>
               <option>04 - Alpes-de-Haute-Provence</option>
               <option>05 - Hautes-Alpes</option>
               <option>06 - Alpes Maritimes</option>
               <option>07 - Ardèche</option>
               <option>08 - Ardennes</option>
               <option>09 - Ariège </option>
               <option>10 - Aube</option>
               <option>11 - Aude</option>
               <option>12 - Aveyron</option>
               <option>13 - Bouches-du-Rhône </option>
               <option>14 - Calvados </option>
               <option>15 - Cantal</option>
               <option>16 - Charente</option>
               <option>17 - Charente-Maritime</option>
               <option>18 - Cher</option>
               <option>19 - Corrèze</option>
               <option>2A - Corse-du-Sud</option>
               <option>2B - Haute Corse</option>
               <option>21 - Côte-d'Or</option>
               <option>22 - Côtes d'Armor</option>
               <option>23 - Creuse</option>
                <option>24 - Dordogne - Périgueux</option>
                <option>25 - Doubs</option>
                <option>26 - Drôme</option>
                <option>27 - Eure</option>
                <option>28 - Eure-et-Loir</option>
                <option>29 - Finistère</option>
                <option>30 - Gard</option>
                <option>31 - Haute Garonne</option>
                <option>32 - Gers</option>
                <option>33 - Gironde</option>
                <option>34 - Hérault</option>
                <option>35 - Ille-et-Vilaine</option>
                <option>36 - Indre</option>
                <option>37 - Indre-et-Loire</option>
                <option>38 - Isère</option>
                <option>39 - Jura</option>
                <option>40 - Lande</option>
                <option>41 - Loir-et-Cher</option>
                <option>42 - Loire</option>
                <option>43 - Haute Loire</option>
                <option>44 - Loire Atlantique</option>
                <option>45 - Loiret</option>
                <option>46 - Lot</option>
                <option>47 - Lot-et-Garonne</option>
                <option>48 - Lozère</option>
                <option>49 - Maine-et-Loire</option>
                <option>50 - Manche</option>
                <option>51 - Marne</option>
                <option>52 - Haute Marne</option>
                <option>53 - Mayenne</option>
                <option>54 - Meurthe-et-Moselle</option>
                <option>55 - Meuse</option>
                <option>56 - Morbihan</option>
                <option>57 - Moselle</option>
                <option>58 - Nièvre</option>
                <option>59 - Nord</option>
                <option>60 - Oise</option>
                <option>61 - Orne</option>
                <option>62 - Pas-de-Calais</option>
                <option>63 - Puy-de-Dôme</option>
                <option>64 - Pyrénées Atlantiques</option>
                <option>65 - Hautes Pyrénées</option>
                <option>66 - Pyrénées Orientales</option>
                <option>67 - Bas-Rhin</option>
                <option>68 - Haut-Rhin</option>
                <option>69 - Rhône</option>
                <option>70 - Haute Saône</option>
                <option>71 - Saône-et-Loire</option>
                <option>72 - Sarthe</option>
                <option>73 - Savoie</option>
                <option>74 - Haute Savoie</option>
                <option>75 - Paris</option>
                <option>76 - Seine Maritime</option>
                <option>77 - Seine-et-Marne</option>
                <option>78 - Yvelines</option>
                <option>79 - Deux-Sèvres</option>
                <option>80 - Somme</option>
                <option>81 - Tarn</option>
                <option>82 - Tarn-et-Garon</option>ne
                <option>83 - Var</option>
                <option>84 - Vaucluse</option>
                <option>85 - Vendée</option>
                <option>86 - Vienne</option>
                <option>87 - Haute Vienne</option>
                <option>88 - Vosges</option>
                <option>89 - Yonne</option>
                <option>90 - Territoire de Belfort</option>
                <option>91 - Essonne</option>
                <option>92 - Hauts-de-Seine</option>
                <option>93 - Seine-St-Denis</option>
                <option>94 - Val-de-Marne</option>
                <option>95 - Val-D'Oise</option>
                <option>971 - Guadeloupe</option>
                <option>972 - Martinique</option>
                <option>973 - Guyane</option>
                <option>974 - La Réunion</option>
             </Input>
           </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Avec combien de personnes?</Label>
              <Input type="text" name="which" id="exampleEmail" placeholder="Entrez le nombre maximal de personnes ..." value={this.state.activityMembers} onChange={(ev)=>this.setState({activityMembers:ev.target.value})} style={{width:350}}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Quel est le prix?</Label>
              <Input type="text" name="which" id="exampleEmail" placeholder="Indiquez le prix ..." value={this.state.activityPrice} onChange={(ev)=>this.setState({activityPrice:ev.target.value})} style={{width:350}}/>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Résumé de l'activité</Label>
                <Input type="text" name="which" id="exampleEmail" placeholder="Résumez l'activité proposée ..." value={this.state.activityResume} onChange={(ev)=>this.setState({activityResume:ev.target.value})} style={{width:350}}/>
            </FormGroup>
            <div>
              <Button color="primary" type="submit" onClick={this.handleSubmit} className="btn btn-primary" style={{marginRight:10}}>Envoyer</Button>
              <Link to="/"><Button  color="secondary" className="btn btn-primary" style={{marginLeft:10}}>Retour</Button></Link>
            </div>
          </Form>
          <Alert  style={{margin:40}}color="info" isOpen={this.state.isOpen}>
           Merci ! Votre activitée a été ajoutée avec succès !
         </Alert>
          </div>
        )
        :
        (
          <div>
            <ConnexionPage/>
          </div>
        )}
          </div>
         </Row>
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
       ):(<ConnexionPage/>)}
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
)(PostForm);
