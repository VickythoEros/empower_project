import React, { useState,useEffect } from 'react';
import {Media } from 'reactstrap';
import {
    Dropdown,
    Icon,
    Sidenav,
    IconButton,
    Button,
    Avatar,
    Badge,
    Whisper,
    ButtonToolbar,
    Modal,
    Panel,
    Col,
    Row,
    Container,
    Content,
  
  } from 'rsuite'
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
import events1 from '../../../assets/images/others/event1.png'

import './ConferenceCard.css';



export default function ConferenceDiffereCard(props) {
   const [dataConference, setDataConference] = useState(props.dataConference)
   
   
   useEffect(() => {
    
    // conference.getConferenceById(props.dataConference._id)
    //     .then(res=>{
    //         setDataConference(res.data.data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
}, [])



// useEffect(() => {
//     conference.getConferenceById(props.dataConference._id)
//         .then(res=>{
//             setDataConference(res.data.data)
//         })
//         .catch(err=>{
//             console.log(err)
//         })
// }, [props.updateOffre])



  return (
    <>
    
    <Panel onClick={()=>props.open(dataConference)} className="bg-white conference-card-container px-3 pb-3 mt-5" shaded bordered bodyFill>
            <Row className="">      
                <Col className="" md={24} sm={24}>
                    <h6 className="h6 text-center p-1 conference-h6-theme font-weight-bold">
                        {dataConference.theme}
                    </h6>
                </Col>   
                <Col className="" md={24} sm={24} xs={24}>
                <Media style={{height:"10em"}} width="100%"  src={events1} alt="event empower"  />
                </Col>
            </Row>
          
              
    </Panel>
           
           
    </>
  );
}

