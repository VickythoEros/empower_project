
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Content,
        Container,
        Row,
        Col,
        Panel,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './ListEvent.css';

import EventTable from '../Tables/EventTable';
import EntretienNav from '../../Entretiens/EntretienNav';
import { apiListEvent } from '../../../../../redux/events/listEvent/listEventAction';
// import DetailModal from './DetailModal';

const data= [
    
    {
      "label": "Ordre decroissant",
      "value": "Date"
    },
    {
      "label": "Ordre Croissant",
      "value": "Nom"
    }
  ]


  function trieEntretien(data){
    
    var dataValide = data.filter((item,index)=> item.statut === true)
    var dataAttente = data.filter((item,index)=> item.statut === false)

    return {dataValide,dataAttente}
  }

export default function ListEvent({match}) {
  
    const store = useStore();
    const listEvent = useSelector(state => state.listEvent)
    const dispatch = useDispatch();
    
  
    // const [textIndication, setTextIndication] = useState("")

    const [listEventData, setListEventData] = useState([])

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  const [rowClickData, setRowClickData] = useState({})
  
  const [rows,setRows] = useState(0)
  const [show,setShow] = useState(false)

//   const [dataValide, setDataValide] = useState([])
//   const [dataAttente, setDataAttente] = useState([])
  

  let history = useHistory();
  

  
//   const handleTextIndication = (value)=>{
//     setTextIndication(value);
//   }
 

  
  const closeModal = ()=>{
    setShow(false);
  }

  const resetRowsModal = ()=>{
    setRows(0);
  }

  const openModal = (data)=>{
    setRowClickData(data)
      setShow(true);
    setTimeout(() => {
      setRows(80);
    }, 1000);
  }


  const handleEdit = () => {
    history.push({
        pathname: '/dashboard/edit_conference',
        search: '?query=abc',
        state: {idConf: ''}
    });
  }

  
  function handleActionShowDetail(data) {
    history.push({
        pathname: '/dashboard/detail_event_row_table',
        search: '?query=abc',
        state: {eventRowData: data._id}
    });

  }
  
  
  function handleNewEvent() {
    history.push({
        pathname: '/dashboard/new_event',
       
    });

  }
  
  const dataClickConf = (value)=>{
    setRowClickData(value)
  }

  
  useEffect(()=>{
    
  
    dispatch(apiListEvent())

    console.log(listEvent.listEvent.data,"eventliste")

  },[dispatch])


  
  useEffect(()=>{
      
    var timer1 = setTimeout(() => {
        if(listEvent.listEvent && listEvent.listEvent.data.length !== 0 && listEvent.listEvent.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListEventData(listEvent.listEvent.data);
            
            // setDataValide(trieEntretien(mesEntretien.entretien.data).dataValide)
            // setDataAttente(trieEntretien(mesEntretien.entretien.data).dataAttente)
            
        }
        if(listEvent.listEvent.data && listEvent.listEvent.data.length === 0 && listEvent.listEvent.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
           
        
      }, 1000);
      // setLoading(false)
      // setUmptyData(false)
      // setListEventData(listEvent.listEvent.data);
      
      return () => {
        clearTimeout(timer1);
      };

  },[listEvent.listEvent.data])


  
  
  useEffect(()=>{
      
    var timer1 = setTimeout(() => {
        if(listEvent.listEvent && listEvent.listEvent.data.length !== 0 && listEvent.listEvent.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListEventData(listEvent.listEvent.data);
            
            // setDataValide(trieEntretien(mesEntretien.entretien.data).dataValide)
            // setDataAttente(trieEntretien(mesEntretien.entretien.data).dataAttente)
            
        }
        if(listEvent.listEvent.data && listEvent.listEvent.data.length === 0 && listEvent.listEvent.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
        
      }, 1000);
      
      return () => {
        clearTimeout(timer1);
      };

  },[])


    return (
       <>
            <Container className="bg-white p-3">
              <Content>
                   
              
            <div className="col-12 col-md-4 ml-n4">
              <h4 className="h4 text-center font-weight-bold" style={{color:"#1ce"}}>
              <IconButton icon={<Icon icon="list" />} circle size="lg" />
              Liste des événements
              </h4>
            </div>
                  <Row  data-aos="zoom-in-down">
                              <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
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

          

            <div className="listEvent-table-container">
            <div className="body-conf-table-container">
                
               
              <Panel shaded>
              <div className="row">
                    <div className="col-12 mx-auto pb-3">
                        
                        <ButtonToolbar className="float-md-right mx-auto">
                            <IconButton onClick={()=> handleNewEvent()} appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                Nouvel Evénements
                            </IconButton>
                        </ButtonToolbar>

                    </div>
                </div>
      
                        
                <Route exact path="/dashboard/list_events" component={()=> <EventTable listEvent={listEventData}
                handleActionShowDetail={handleActionShowDetail}
                   /> }/>
    
                     
                </Panel>
                </div>
          
            </div>

        </Content>
      </Container>
    </>
    
    )

}