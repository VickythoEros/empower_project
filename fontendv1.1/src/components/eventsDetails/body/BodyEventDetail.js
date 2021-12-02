import React, { useState ,useEffect} from 'react';
import {
    Media, 
    Pagination,
    Row,
    Col,
} from 'reactstrap';

import {
    Alert,
    Button,
    Notification,

  
  } from 'rsuite';
  
  
  import {useSelector, useDispatch,useStore} from 'react-redux' 
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
import details from '../../../assets/images/eventDetails/details.png';

import { useHistory,useLocation } from "react-router-dom";


import VideoPlayer from '../../accueil/VideoPlayer';
import EntrepriseCard from '../../entreprise/EntrepriseCard';
import Postes from '../../postes/Postes';

import './bodyEventDetail.css';
import Chronogramme from './Chronogramme';
import { apiParticipateEvent } from '../../../redux/events/participateEvent/participateEventAction';
import { apiParticipateVerify } from '../../../redux/events/participateVerify/participateVerifyAction';
import participateEvents from '../../../api/participateEvent';
import utilisateurs from '../../../api/utilisateur';
import evenements from '../../../api/evenement';
import postes from '../../../api/poste';
import OffreModal from '../../dashboard/pages/Offres/OffreModal';
import GalleryEvents from './Gallery/GalleryEvents';
import ConferenceCard from '../Conferences/ConferenceCard';
import conferences from '../../../api/conference';
import ConferenceEventModal from '../Conferences/ConferenceEventModal';
import { restTime, trieParticipantsEntreprise } from '../../../services/_modules';
import { openParticipateAlert } from '../../others/NotificationInfog';
import conferencesDiffere from '../../../api/conferenceDiffere';
import ConferenceDiffereCard from '../conferenceDiffere/ConferenceDiffereCard';
import ConferenceEventModalDiffere from '../conferenceDiffere/ConferenceEventModalDiffere';



const BodyEventDetail = (props) => {
    
    let history = useHistory();
    
   const store = useStore()
   const user = store.getState().connected.user.data
  const location = useLocation();
  const dataEvent = location.state.eventData;
  
  const dispatch = useDispatch()
  const participateEvent = useSelector(state => state.participateEvent)
//   const participateVerify = useSelector(state => state.participateVerify)

    const [participants,setParticipants] = useState([])
    
    const [participantsEntreprise,setParticipantsEntreprise] = useState(trieParticipantsEntreprise(participants?participants:[]))

  const [participate,setParticipate] = useState(false)
  const [btnLoading,setBtnLoading] = useState(false)
  const [annulerData,setAnnulerData] = useState(false)

  const [allPostesEvent,setAllPostesEvent] = useState([])
  

  const [allConferencesEvent,setAllConferencesEvent] = useState([])

  const [cardClickDataConferenceModal,setCardClickDataConferenceModal] = useState([])
  const [cardClickDataConferenceModalDiffere,setCardClickDataConferenceModalDiffere] = useState([])

  const [show,setShow] = useState(false);
  const [rows,setRows] = useState(0);

  const [cardClickData,setCardClickData] = useState([])

  const [updateOffre,setUpdateOffre] = useState(false)


  const [showConferenceModal, setShowConferenceModal] = useState(false);
  const [rowsConferenceModal, setRowsConferenceModal] = useState(0);

  
  const [showConferenceModalDiffere, setShowConferenceModalDiffere] = useState(false);
  const [rowsConferenceModalDiffere, setRowsConferenceModalDiffere] = useState(0);

  const [conferenceDiffereEvent,setConferenceDiffereEvent] = useState([])


  const entrepriseCardClicker = (data) => {
    history.push({
        pathname: '/entreprise_details',
        search: '?query=abc',
        state: {entrepriseId: data.participant}
    });

            
    } 
        



  const updateOffreFunc = ()=>{
      setUpdateOffre(!updateOffre);
    }


  function close() {
      setShow(false);
    }

  function resetRows() {
      setRows(0);
    }

  function open(data) {
      setShow(true);
      setCardClickData(data)
      var timer = setTimeout(() => {
        setRows(80)
      }, 1000);

      return () => {clearTimeout(timer)}
  }

  
  function closeConferenceModal() {
    setShowConferenceModal(false);
  }

function resetRowsConferenceModal() {
    setRowsConferenceModal(0);
  }

  function openConferenceModal(data) {
    setShowConferenceModal(true);
    setCardClickDataConferenceModal(data)
     var timer = setTimeout(() => {
      setRowsConferenceModal(80)
    }, 1000);

    return () => {clearTimeout(timer)}
}

  
function closeConferenceModalDiffere() {
    setShowConferenceModalDiffere(false);
  }

function resetRowsConferenceModalDiffere() {
    setRowsConferenceModalDiffere(0);
  }

  function openConferenceModalDiffere(data) {
    setShowConferenceModalDiffere(true);
    setCardClickDataConferenceModalDiffere(data)
     var timer = setTimeout(() => {
      setRowsConferenceModalDiffere(80)
    }, 1000);

    return () => {clearTimeout(timer)}
}


function showAlertConfNotDisponible(date,heure) {
   
    Alert.info(`Veuillez patienter dans moins de ${restTime(date,heure)} Minutes.`,8000)

}


  const clickParticipateEvent = () => {
      
    if(user){
    
        var eventData={
            participant:user._id ,
            type_compte: user.type_compte,
        }
    setBtnLoading(true)
    dispatch(apiParticipateEvent(dataEvent._id,eventData))

    var timer = setTimeout(() => {
        setBtnLoading(false)
                
        }, 2000);   
            
    return () => {clearTimeout(timer)}
        
    
    }
    else{
        openParticipateAlert("Veuillez-vous connecter s'il vous plaît.")
    }

    
  }

  
  const clickParticipateAnnuler = () => {
    
    if(user){
    
        setBtnLoading(true)
        if(user.type_compte === "entreprise"){
            utilisateurs.getUserEntreprise(user._id)
                .then(res => {
                    var eventData={
                        participant:res.data.data._id ,
                        type_compte: user.type_compte,
                    }
                    evenements.deleteParticipant(dataEvent._id,eventData)
                        .then(res => {
                            
                            console.log(participants,'dataparticipant')
                            setAnnulerData(!annulerData)
                        })
                        .catch(err => {
                            console.log(err,'error dalete error')
                        })
                })
                .catch(err => {
                    console.log(err,'error data entreprise')
                })
                
        }
        else{
            var eventData={
                participant:user._id ,
                type_compte: user.type_compte,
            }
            
            evenements.deleteParticipant(dataEvent._id,eventData)
                .then(res => {
                    console.log(res.data,'response')
                    setAnnulerData(!annulerData)
                })
                .catch(err => {
                    console.log(err,'error dalete error')
             })

        }


        var timer = setTimeout(() => {
            setBtnLoading(false)
                    
            }, 2000);   
                
        return () => {clearTimeout(timer)}
    }

  }
  

  useEffect(() => {
    
    evenements.getEvenementById(dataEvent._id)
        .then(res => {
            
            setParticipants(res.data.data.participants)
            props.setUpdateParticipant(res.data.data.participants)
            
            setParticipantsEntreprise(trieParticipantsEntreprise(res.data.data.participants))

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[participateEvent.event])



   useEffect(() => {
    
    evenements.getEvenementById(dataEvent._id)
        .then(res => {
            
            setParticipants(res.data.data.participants)
            props.setUpdateParticipant(res.data.data.participants)

            setParticipantsEntreprise(trieParticipantsEntreprise(res.data.data.participants))
           

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[annulerData])





   useEffect(() => {
    if(user){
    if(user.type_compte === "entreprise"){
        utilisateurs.getUserEntreprise(user._id)
            .then(res => {

                const resultat = participants.find( element => element.participant === res.data.data._id);
                
                if(resultat){
                    
                    setParticipate(true)
                }
                else{
                    setParticipate(false)
                }

            })
            .catch(err => {
                console.log(err,'error data entreprise')
            })
            
    }
    else{
       const resultat = participants.find( element => element.participant === user._id);
                
        if(resultat){
            setParticipate(true)
        }
        else{
            setParticipate(false)
        }
   
    }
    }
                

   },[participants])


     

   useEffect(() => {
    postes.getEventPostes(dataEvent._id)
        .then(res => {
          
            setAllPostesEvent(res.data.data)

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[])


   useEffect(() => {
    conferences.getEventConference(dataEvent._id)
        .then(res => {
            
            setAllConferencesEvent(res.data.data)

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })

    conferencesDiffere.getEventConferenceDiffere(dataEvent._id)
        .then(res => {
                
            setConferenceDiffereEvent(res.data.data)
            console.log(res.data.data,"differe")

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[])


   useEffect(() => {
    setParticipantsEntreprise(trieParticipantsEntreprise(participants?participants:[]))


   },[participants])









  return (
    <>
        <div className="before-body-container">
            <div className="body-event-detail-container">
            <div className="container pt-5">

                <Row className="mx-auto text-center">
                        
                    <Col className="" md="12" sm="12">
                            
                        <Button size="lg" loading={btnLoading}
                        appearance={participate ? "ghost" : ""} 
                        color={participate ? "red" : ""} 
                        className={participate ? "btn-annuler" : "btn-participer"}  onClick={() =>{participate? clickParticipateAnnuler() :clickParticipateEvent()} } >
                           {participate ? "Annuler participation" : "Participer à l'événement"}
                        </Button>

                    </Col>
                        
                </Row>

                <Row data-aos="zoom-in-down"  className="mt-5 mx-auto">
                    <Row className="mx-auto text-center ">      
                        <Col className="mt-5 mx-auto text-center" md="12" sm="12">
                            <h3 className="h3 font-weight-bold " >
                                Quelques images et vidéos de nos activités 
                            </h3>
                        </Col>
                    </Row>
                    <Col className="mt-3 mx-auto"  md="6" sm="12">
                        <div className="mx-auto"  >
                            
                        <VideoPlayer/>

                        </div>
                    </Col>
                    <Col className="mx-auto mt-3" md="6"  sm="12">      
                            <GalleryEvents dataEvent={dataEvent} />
                    </Col>
                </Row>


            </div>

           
            <div  className="mx-auto text-center mt-5 pt-3 pb-5 body-chronogramme">
                <h3 className="h3 text-center ">
                    Chronogramme
                </h3>
                {/* <div className="bottom-style" ></div> */}
                <div className="mt-4" >
                <Chronogramme  dataEvent={dataEvent} />

                </div>
                

            </div>

            <OffreModal rows={rows} updateOffreFunc={updateOffreFunc} show={show} close={close} dataClicker={cardClickData} resetRows={resetRows}/>
            
                <div data-aos="zoom-in-down"   className="poste-event-details container mx-auto">
                    <h3 className="text-center">
                        {(allPostesEvent && allPostesEvent.length > 0 )?"LISTE DES POSTES " : ""}
                    </h3>
                    <Row className="poste-event-postes mt-4">
                        {allPostesEvent.map((item,index)=>{
                            return  <Postes updateOffre={updateOffre} dataPoste={item} key={item._id} index={index}
                            open={open}
                            />

                        })
                        
                        }
                        
                       
                    </Row>
                

                </div> 

                
                
                <ConferenceEventModal 
                show={showConferenceModal} 
                close={closeConferenceModal}  
                resetRows={resetRowsConferenceModal} 
                rows={rowsConferenceModal}
                dataClicker={cardClickDataConferenceModal} 
                showAlertConfNotDisponible={showAlertConfNotDisponible}
                /> 
              <ConferenceEventModalDiffere
                show={showConferenceModalDiffere} 
                close={closeConferenceModalDiffere}  
                resetRows={resetRowsConferenceModalDiffere} 
                rows={rowsConferenceModalDiffere}
                dataClicker={cardClickDataConferenceModalDiffere} 
                showAlertConfNotDisponible={showAlertConfNotDisponible}
                /> 
                <div className="conference-event-details container mx-auto mt-5 ">
                    <h3 className="text-center mt-5">
                        {(allConferencesEvent && allConferencesEvent.length > 0 )?"LISTE DES CONFERENCES" : ""}
                    </h3>
                    <Row className="conference-event-conferences mx-auto mt-4">
                        {allConferencesEvent.map((item,index)=>{
                            return  <ConferenceCard  dataConference={item} key={item._id} index={index}
                            open={openConferenceModal}
                            />

                        })
                        
                        }
                         
                       
                    </Row>

                    <Row className="conference-event-conferences mx-auto mt-4">
                        {conferenceDiffereEvent.map((item,index)=>{
                            return  <ConferenceDiffereCard  dataConference={item} key={item._id} index={index}
                            open={openConferenceModalDiffere}
                            />

                        })
                        
                        }
                         
                       
                    </Row>
                

                </div>
                
            </div>
        </div>

        <div className="page-seconde-container ">
            <div className="container-entreprise mx-auto text-center">
                    
                <div className="entreprises-event-details mx-auto text-center">
                    <h3>
                            Les entreprises qui y participent
                    </h3>
                    
                    <Row className="mx-auto container mt-3">
                    <>
                    {participantsEntreprise.map((item,index)=>{
                            return <EntrepriseCard onClicker={entrepriseCardClicker}
                            key={item._id} index={index}
                            dataEntreprise={item}
                             />
                            

                        })
                        
                        }
                        
                      
                    </>
                       
                    </Row>
                     

                </div>

                
            </div>
        </div>
    </>
  );
}


export default BodyEventDetail;