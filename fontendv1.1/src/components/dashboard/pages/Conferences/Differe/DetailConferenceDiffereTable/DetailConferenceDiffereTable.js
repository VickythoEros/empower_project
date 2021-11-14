import { useState, useEffect } from 'react';
import {
        Icon,
        IconButton,
        Row,
        Col,
        Modal,
        Panel,
        Message,
        Button,
        Alert,
        ButtonToolbar,
        Notification

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import {useSelector, useDispatch,useStore} from 'react-redux' 

import Iframe from 'react-iframe'

  

export default function DetailConferenceDiffereTable(props){

    const store = useStore()
    const user = store.getState().connected.user.data
    const [conferenceDataRow, setConferenceDataRow] = useState(props.dataClicker)




    useEffect(()=>{
        setConferenceDataRow(props.dataClicker)

    },[props.dataClicker])

    return(
        <>
       
        <Modal size="md" className="" show={props.show} onHide={()=>props.close()}>
          {/* <Modal.Header className="modal-header py-2">
            <Modal.Title style={{color:'purple'}}> {conferenceDataRow.theme} </Modal.Title>
          </Modal.Header> */}
          <Modal.Body className="modal-body">
          <Row  data-aos="zoom-in-down" className="">
                <Col className="" md={24} sm={24}>
                        

                        
                </Col>
            </Row>
           <Panel className=" mx-auto text-center bg-white" shaded bordered bodyFill>

                <Row  data-aos="zoom-in-down" className="">
                    <Col className="" md={24} sm={24}>
                        

                        
                    </Col>
                        
                </Row>
            </Panel>   
                
                    
                  
           
          </Modal.Body>
        </Modal>
        </>
    )
}