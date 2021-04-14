import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import axiosInstance from './Axios/interceptors';
class Secure extends Component {

  constructor(props) {
    super(props);
    this.state = {info:null, keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
      if(authenticated){
        window.accessToken=keycloak.token;
        console.log(window.accessToken);
      }
    })
  }
  click(){
    let id="3";
   const x= axiosInstance.get('http://localhost:3001/student/'+id);
   x.then((p)=>{
     this.state.info=p.data;
     p=p.data;
   })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
          <button onClick={()=>{this.click()}}>print All Students</button>
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secure;