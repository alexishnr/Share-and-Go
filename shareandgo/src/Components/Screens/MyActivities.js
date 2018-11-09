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

        var ctx = this;

        fetch('https://shareandgo-backend.herokuapp.com/get-like-activity', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user_id='+ctx.props.user._id
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data,"#######DATAAAA");
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
    console.log(this.state.activities.length, 'test activities length');

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
       <div className="background2" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'auto'}} >
       <div>
       <FormGroup>
        <Label style={{color:'#FFF'}} for="exampleSelect">Thème</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={this.onChangeTheme.bind(this)}>
          <option>Sélectionnez un thème ..</option>
          <option>Food</option>
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
       <Label style={{color:'#FFF'}} for="exampleSelect">Département</Label>
       <Input type="select" name="select" id="exampleSelect" onChange={this.onChangePlace.bind(this)}>
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
       </div>
       <Alert color="danger" isOpen={isOpen}>
        Désolé aucune activitée n'a été trouvée, veuillez réessayer !
      </Alert>
       </div>
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
