
import React, { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,
        Content,
        Container,
        Row,
        Col,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './AllConferences.css';
import AllConferenceOwn from './AllConferenceOwn';

import AllConferenceOther from './AllConferenceOther';
import { apiGetAllConference } from '../../../../redux/candidats/getConference/candGetConferenceAction';
import { apiListEvent } from '../../../../redux/events/listEvent/listEventAction';

const data= [
    
    {
      "label": "Date de publication",
      "value": "Date"
    },
    {
      "label": "Nom",
      "value": "Nom"
    }
  ]
  
  
  export default function AllConferences(props) {
  const allConferences = useSelector(state => state.CandidatGetConferences)
  const eventsList = useSelector(state => state.listEvent).listEvent.data
  
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(apiGetAllConference())
    dispatch(apiListEvent())
    

  },[dispatch])


 
    return (
       <>

            <Container className="bg-white p-3 ">
              <Content className="" >
                <div className="">
                <div className="col-12 mx-auto ">
                            <h4 className="font-weight-bold" style={{color:"purple"}}>
                            <IconButton icon={<Icon icon="list" />} circle size="lg" />
                                Liste des Conférences
                            </h4>
                        </div>
                  <Row  data-aos="zoom-in-down">
                              <Col className="p-3 text-center"   md={12} sm={12}>
                                  <InputGroup inside>
                                      <Input size="lg" placeholder="Recherche..." />
                                      <InputGroup.Button>
                                          <Icon icon="search" />
                                      </InputGroup.Button>
                                  </InputGroup>
                            
                              </Col>
                              <Col className="p-3" md={12} sm={12}>
                                <InputPicker size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                              </Col>

                    </Row>
            
            </div>
            <div className="allconferences-table-container">
            <div className="styled-conference-before"></div>
                <div className="body-allconference" data-aos="zoom-in-down">
              
                    <AllConferenceOwn allConf= {allConferences.conference.data} />


                </div>

            </div>
            
        </Content>
      </Container>
      

    </>
    
    )

}