import React from 'react';
import RichTextEditor, { stateToHTML } from "react-rte";
import parse from 'html-react-parser';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Schema,
    SelectPicker,
    DatePicker,
    Toggle,
    InputNumber,
    Slider,
    Container,
    Content,
    Row,
    Col,
    Modal,
    Message,



} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import './NewConferenceDiffereForm.css'

import conferencesDiffere from '../../../../../../api/conferenceDiffere';
import configureStore from '../../../../../../redux/store';
import { alertSuccess,alertError } from '../../../../../others/NotificationInfog';

const { StringType, NumberType, DateType} = Schema.Types;

const model = Schema.Model({
   
    evenement: StringType().isRequired('Champ Obligatoire.'),
    theme: StringType().isRequired('Champ Obligatoire.'),
    video: StringType().isRequired('Champ Obligatoire.'),
   

});

  
      const initialState ={
        formValue: {
          evenement: '',
          theme:'',
          video: '',
        },
        formError: {},
        loading: false,
      }

  
  // fonction declassement des entreprise
  function trierEvent(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.titre,
          "value": item._id,
        }
        return dataItem;
      
    })
    .filter((item,index)=> item !== undefined)
    
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




const {store} = configureStore()

class NewConferenceDiffereForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleActionNewConference = this.handleActionNewConference.bind(this);
    // this.onVideoChange = this.onVideoChange.bind(this);
    
    
  
  }

  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }

  
  // onVideoChange(e) {
  //   this.setState({ video: e.target.files[0] })
  // }


  handleActionNewConference = e => {
    setTimeout(() => {
      this.setState({evenement:''})
      this.setState(initialState)
      this.props.history.push("/dashboard/new_conference");
      
      this.close()
      
    },2000)
  };



  handleSubmit() {
    const { formValue} = this.state;
    
    this.setState({loading: true})
    if (!this.form.check()) {  
      this.setState({loading: false})
     
      return;
    }
    

  
  // const formData = new FormData();
  // formData.append('theme', formValue.theme);
  // formData.append('evenement', formValue.evenement);
  // formData.append('video', video);



  conferencesDiffere.insertConferenceDIffere(formValue)
    .then(res =>{

        this.setState({loading: false})
        alertSuccess("Conférence différée créee avec succes !")

    } )
    .then(err =>{
      
      this.setState({loading: false})
      console.log(err,'error server')
      alertError("Une Erreur s'est produite")
  } )
  

  }

  
  


  render() {
    const { formError, formValue,loading } = this.state;

    return (
      <div className="mx-auto">
      
        <Form
          fluid
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
           
            <Container data-aos="zoom-in-down" className="bg-white">
              <Content>
                  <Row  >
                        <Col md={7} sm={24}>
                          <TextField size="lg" name="theme" placeholder="Ex: Formation" label="Thème de la conference" />  
                        </Col>

                        <Col md={7} sm={24}>
                          
                          <TextField size="lg" style={{width:"30em",zIndex:99}} accepter={SelectPicker} name="evenement" size="lg" placement="auto" onChange={this.selectEventChange}  emplacement="auto" data={trierEvent(store.getState().listEvent.listEvent.data)}  label="Selectionner un événement" />  
                         
                        </Col>
                        
                        <Col md={7} sm={24}>
                                {/* <ControlLabel>Choissisez la vidéo </ControlLabel>
                                  <div className="input-file-container">
                                    <input 
                                    onChange={this.onVideoChange} className="input-file" id="my-file3" type="file"/>
                                   
                                  </div> */}
                                <TextField size="lg" name="video" placeholder="" label="Entrez l'URL de la vidéo" /> 
                        </Col>
                        <Col md={3} sm={24} className="pt-3">
                          <ButtonToolbar>
                            <Button loading={loading} size="lg" className="float-md-right " color="violet" appearance="ghost" onClick={this.handleSubmit}>
                              Creer la conference
                            </Button>

                          </ButtonToolbar>
                          
                        </Col>
                    </Row>
           
         
              </Content>
            </Container>


        </Form>

       
      </div>
    );
  }
}


export default NewConferenceDiffereForm;



  