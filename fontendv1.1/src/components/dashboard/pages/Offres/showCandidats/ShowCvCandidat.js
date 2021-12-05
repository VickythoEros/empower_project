import React,{useState,useEffect} from 'react'
import {
    Button,
    Modal,
    
} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import FileViewers from '../../../../../services/FileViewers'

 export default function CvViewer(props){
  const [userData, setUserData] = useState(props.userData)
  
  useEffect(() => {
    setUserData(props.userData)
    console.log(props.userData)
    
  }, [props.userData])

  
    return (

        <div className="modal-container">
  
          <Modal show={props.showCvViewerCandidat} onHide={props.closeCvViewerCandidat} onExited={props.resetRowsCvViewerCandidat} className="modal-candidat-detail">
            <Modal.Header> 
              <Modal.Title style={{color:"purple"}} >Détail Candidat </Modal.Title>
           
            </Modal.Header>
            <Modal.Body className="modal-Candidat-detail-body">
              
              
                <FileViewers />


            </Modal.Body>
            <Modal.Footer className="pt-3 mx-auto">
                
                <Button onClick={()=>props.closeCvViewerCandidat()}  appearance="subtle">
                  Fermer
                </Button>
              </Modal.Footer>
         
          </Modal>
        </div>
      );
    
  }
  