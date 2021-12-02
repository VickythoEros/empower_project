
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,
        Panel,
        Container,
        Content,
        Row,
        Col,


    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './OwnOffres.css';
import TableOffre from './TableOffre';


const data= [
    
    {
      "label": "Date decroissante",
      "value": "Date"
    },
    {
      "label": "Date croissante",
      "value": "Nom"
    }
  ]

   
export default function OwnOffres() {
    
    let history = useHistory();
    
  function handleActionNewOffre() {
    history.push({
        pathname: '/dashboard/new_offre',
    });

  }


 
    return (
       <>

            <Container className="bg-white p-3">
              <Content>
                    <div className="row">
                        <div className="col-12 mx-auto ">
                            <h4 className="font-weight-bold" style={{color:"#1ce"}}>
                            <IconButton icon={<Icon icon="list" />} circle size="lg" />
                                Liste des offres
                            </h4>
                        </div>
                        
                    </div>
                  <Row  data-aos="zoom-in-down">
                              <Col className="p-3 text-center"  md={12} sm={12}>
                                  <InputGroup inside>
                                      <Input size="lg" placeholder="Trier par..." />
                                      <InputGroup.Button>
                                          <Icon icon="search" />
                                      </InputGroup.Button>
                                  </InputGroup>
                            
                              </Col>
                              <Col className="p-3" md={12} sm={12}>
                                <InputPicker size="lg" className="float-md-right w-100" data={data} placeholder="Rechercher par..."/>
                              </Col>

                    </Row>

           
            
            <div data-aos="zoom-in-down" className="ownoffre-table-container mt-md-2 mt-2 ">
                
                
                <div className="pt-3">
                <Panel shaded>
                    <TableOffre  handleActionNewOffre={handleActionNewOffre} />
                </Panel>
                </div>
            </div>

        </Content>
      </Container>

    </>
    
    )

}