import React from 'react';
import {Redirect} from 'react-router';
import { Form, FormGroup, FormControl, 
        ControlLabel, Notification,Schema ,
        Button,ButtonToolbar
    } from 'rsuite';

import utilisateurs from '../../api/utilisateur';
import 'rsuite/dist/styles/rsuite-default.css'

import './formLogin.css'
const { StringType } = Schema.Types;


const model = Schema.Model({
  
  email: StringType()
          .isEmail('Entrer un email valide.')
          .isRequired('Champ obligatoire.'),
  password: StringType()
              .isRequired('Champ obligatoire.')
});


function openError(msg) {
  Notification.error({
    title: "Erreur d'authentification",
    description: msg
  });
}



class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}


class FormLogin2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        email: '',
        password: ''
      },
      submit:false,
      formError: {},
      isLoggedIn: false,
      showMessage:false,
      err:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


 
  

  handleSubmit() {
    const { formValue } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    
    utilisateurs.login(formValue)
      .then(res =>{
        
        localStorage.setItem("userConnected", JSON.stringify(res.data));
        
        this.setState({showMessage:false})
        this.setState({isLoggedIn:true})
      })
      .catch(res =>{
        const error = res.response.data
        openError(error.error? error.error :"Vérifier votre Email et Mot de passe.")
        this.setState({showMessage:true,isLoggedIn:false,err : error.error})
        
      })

    
  }


  render() {
    const { formValue ,isLoggedIn} = this.state;

    if(isLoggedIn === true){
            return (<Redirect to="/" />);
        }
    else{
      
        
    return (

      <div className="form-login-container">
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >


          <div className="first mt-3">
          
              
            <div className="row">

              <div className="col-6">
                <TextField name="email" label="Votre email"  placeholder="Votre email" />
              </div>
             
            </div>

            <div className="row">

              <div className="col-6">
                <TextField name="password" label="Votre mot de passe" type="password" />
              </div>
              
            </div>

          </div>



          <ButtonToolbar className="p-3">
            <Button appearance="primary" className='btn-login-style' onClick={this.handleSubmit}>
              connexion
            </Button>
          </ButtonToolbar>

        </Form>
      </div>
    );
  }      
}
}



export default FormLogin2;
// export default FormLogin2;
