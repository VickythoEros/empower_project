import React,{useState,useEffect} from 'react';
import { Table,SelectPicker,Col,Row,FormGroup,ControlLabel,ButtonToolbar,IconButton,Icon ,InputGroup,Input,
} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import conferencesDiffere from '../../../../../../api/conferenceDiffere';
import evenements from '../../../../../../api/evenement';
import utilisateurs from '../../../../../../api/utilisateur';
import configureStore from '../../../../../../redux/store';
import { dataDebut, dataMinute } from '../../../../../../services/_modules';
import DetailConferenceDiffereTable from '../DetailConferenceDiffereTable/DetailConferenceDiffereTable';

const { Column, HeaderCell, Cell, Pagination } = Table;
const {store} =configureStore()



const proprioConferenceData=[
  {
  "label":"Mes conférences",
  "value":"own",
  },
  {
    "label":"Toutes les conférences",
    "value":"all",
    }
]


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


   const getEventinfos = (value)=>{
    var data ;
     evenements.getEvenementById(value)
      .then(res =>{
        data = res.data.data
      })
      .catch(err =>{
        console.error(err)
      })
    return data
  }


  function constitueData(data){
    return data.map((item,index)=>{
        
      
      return {
        ...item,
        evenement: '',
  
    }})
  }
  

  // fonction search data table
  function constitueDataChanged(data,value){

    return data.filter((item,index)=> item.evenement === value )
    
  }

  function filterOwnConferenceDiffere(data,value){

    return data.filter((item,index)=> item.entreprise === value )
    
  }


export default function TablesConferenceDiffere(props){

  
  const user = store.getState().getInfoUser.user.data
    const [data,setData] = useState([{}]);
    // const [load,setLoad]=useState(true);
   


    const [dataChanged, setDataChanged] = useState([])
    const [entrepriseData, setEntrepriseData] = useState([])
    const [loadTable, setLoadTable] = useState(false)
    const [selectEventValue, setSelectEventValue] = useState('')
    const [etatPropio, setEtatPropio] = useState('own')
    const [allData, setAllData] = useState([])
    

    const [showConferenceModalDiffere, setShowConferenceModalDiffere] = useState(false);
    const [rowsConferenceModalDiffere, setRowsConferenceModalDiffere] = useState(0);
    const [dataConferenceDif, setDataConferenceDif] = useState([]);
  


    function closeConferenceModalDiffere() {
      setShowConferenceModalDiffere(false);
    }
  
  function resetRowsConferenceModalDiffere() {
      setRowsConferenceModalDiffere(0);
    }
  
    function openConferenceModalDiffere(data) {
      setShowConferenceModalDiffere(true);
      setDataConferenceDif(data)
       var timer = setTimeout(() => {
        setRowsConferenceModalDiffere(80)
      }, 1000);
  
      return () => {clearTimeout(timer)}
  }
  
  

    useEffect(()=>{
      setLoadTable(true)

      utilisateurs.getUserEntreprise(user._id)
        .then(res =>{
          setEntrepriseData(res.data.data)

          conferencesDiffere.getAllConferenceDiffere()
            .then(resp=>{

                  setData(filterOwnConferenceDiffere(constitueData(resp.data.data),res.data.data._id))
                  setLoadTable(false)

            })
        } )
        .catch(err =>{
          console.error(err)
        } )

    },[])


//     useEffect(()=>{
      
//       const dataTable = props.conference ;
//       setAllData(props.conference)
//       setData(dataTable ? filterOwnConference(constitueData(dataTable),entrepriseData._id): [{}])
      
//       if(etatPropio ==="own"){
//         setData(dataTable ? filterOwnConference(constitueData(dataTable),entrepriseData._id): [{}])
//       }
//       if(etatPropio ==="all"){
//         setData(dataTable ?constitueData(dataTable): [{}])
//       }
      
//    },[props.conference])

   

    const selectEvent = (value,e)=>{
      setLoadTable(true)
      setSelectEventValue(value)
      
      setTimeout(() => {
        setDataChanged(constitueDataChanged(data,value))
        setLoadTable(false)
        
      }, 1000);
    }

    const selectProprioConference = (value,e)=>{
    setLoadTable(true)
    setEtatPropio(value)

    setTimeout(() => {
      setLoadTable(false)

      if(value ==="own"){
        setData(allData ? filterOwnConferenceDiffere(constitueData(allData),entrepriseData._id): [])
      }
      if(value ==="all"){
        setData(allData ?constitueData(allData): [])
      }

      
    }, 1000);
    }


    const handleActionShowDetail = () => {
      
    }


      return (
        <div>

        <DetailConferenceDiffereTable
                show={showConferenceModalDiffere} 
                close={closeConferenceModalDiffere}  
                resetRows={resetRowsConferenceModalDiffere} 
                rows={rowsConferenceModalDiffere}
                dataClicker={dataConferenceDif} 
                /> 

        <Row >
          {user.admin && (<Col className="pb-3"  md={8} sm={24}>
          <FormGroup  className="float-md-left mx-auto">
            <ControlLabel> Selectionner un propriétaire </ControlLabel>
              <SelectPicker
              onChange={(value,e)=>selectProprioConference(value,e)}
              size="lg"
              placeholder="Mes conférences"
              data={proprioConferenceData}
              style={{ width: 300, display: 'block', }}
              />
          </FormGroup>
          </Col>)
          }
          <Col className="pb-3"  md={user.admin?8:12} sm={24}>
          <FormGroup  className="float-md-left mx-auto">
            <ControlLabel> Selectionner un événement </ControlLabel>
              <SelectPicker
              onChange={(value,e)=>selectEvent(value,e)}
              size="lg"
              placeholder="Selectionner"
              data={trierEvent(store.getState().listEvent.listEvent.data)}
              style={{ width: 300, display: 'block', }}
              />
          </FormGroup>
          </Col>
          <Col  md={user.admin?8:12} sm={24} className="pt-4">
                <InputGroup inside >
                    <Input size="lg"  placeholder="Recherche..." />
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                </InputGroup>
            </Col>
          

        </Row>
          <Table
          loading={loadTable}
          fluid
          virtualized={true}
            height={400}
            data={selectEventValue? dataChanged :data}
            onRowClick={data => {
              openConferenceModalDiffere(data);
            }}
          >
            
            <Column width={300} fixed>
              <HeaderCell style={{background:'blue',color:'#fff', fontWeight:"bold"}} >Theme</HeaderCell>
              <Cell dataKey="theme" />
            </Column>
  
            <Column width={400}>
              <HeaderCell style={{background:'blue',color:'#fff', fontWeight:"bold"}} >Evenement</HeaderCell>
              <Cell dataKey="evenement" />
            </Column>

            <Column width={400}>
              <HeaderCell style={{background:'blue',color:'#fff', fontWeight:"bold"}} >Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
           
  
          </Table>
        </div>
      );
    
  }
