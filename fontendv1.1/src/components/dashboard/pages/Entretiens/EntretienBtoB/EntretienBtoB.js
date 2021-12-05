
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
        Row,
        Col,
        Container,
        Content


    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './EntretienBtoB.css';

import TableEntretiensBtoB from './TableEntretiensBtoB';
import EntretienNavBtoB from './EntretienNavBtoB';
import entretiens from '../../../../../api/entretien';

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


  function trieEntretien(data){
    
    var dataValide = data.filter((item,index)=> item.statut === true)
    var dataAttente = data.filter((item,index)=> item.statut === false)

    return {dataValide,dataAttente}
  }

export default function EntretienBtoB({match}) {
  let history = useHistory();
  
    const store = useStore();
  
    const [entretiensData, setEntretienData] = useState([])

  const [loading,setLoading] = useState(true)
  const [loadingTable,setLoadingTable] = useState(false)

  const [dataValide, setDataValide] = useState([])
  const [dataAttente, setDataAttente] = useState([])
  const [etatDemande,setEtatDemande] = useState('')
  
  const user = store.getState().getInfoUser.user.data

  const handleEdit = (dataId) => {
    history.push({
        pathname: '/dashboard/edit_entretien',
        state: {entretienRowDataId: dataId}
    });
  }


  
  const handleActionNewEntretien = () => {
    history.push({
        pathname: '/dashboard/new_entretien',
    });
  }

  
  const dataClickEntretien = (dataId)=>{
    history.push({
      pathname: '/dashboard/detail_entretien_b_to_b',
      state: {entretienRowDataId: dataId,retour:"entretiens_b_to_b",etatDemande:etatDemande,type:"entreprise"}
    });
  }
  

  useEffect(()=>{
    setLoadingTable(true)
    entretiens.getAllEntrepriseEntretien(user._id)
      .then((res) => {
        setLoadingTable(false)
        setLoading(false)
        setEntretienData(res.data.data)
        setDataValide(trieEntretien(res.data.data).dataValide)
        setDataAttente(trieEntretien(res.data.data).dataAttente)
        
        console.log(res.data.data,'entretien')

      })
      .catch((err) => {
        setLoadingTable(false)
        console.log(err,'entretien')

      })

  },[])

  
  useEffect(()=>{
    setLoadingTable(true)
    entretiens.getAllEntrepriseEntretien(user._id)
      .then((res) => {
        setLoadingTable(false)
        setLoading(false)
        setEntretienData(res.data.data)
        setDataValide(trieEntretien(res.data.data).dataValide)
        setDataAttente(trieEntretien(res.data.data).dataAttente)
        
        console.log(res.data.data,'entretien')

      })
      .catch((err) => {
        setLoadingTable(false)
        console.log(err,'entretien')

      })

  },[entretiens])



    return (
       <>

      <Container className="bg-white px-3" >
        <Content >
          <div data-aos="zoom-in-down" className="container-fluid">
            <div className="mx-auto row py-4">
             
                <div className="col-12 py-2 color-purple" >
                  <h4 className="mx-auto" style={{color:"purple"}}>
                  <IconButton icon={<Icon icon="list" />} circle size="lg" />
                    Listes entretiens B2B
                  </h4>
                </div>
                
              <Row  >
                        <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
                            <InputGroup inside>
                                <Input  size="lg" placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                       
                        </Col>
                        <Col className="p-3" md={12} sm={12}>
                          <InputPicker  size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                        </Col>

              </Row>

                  
            </div>
          
           
           
            <div className="conferences-table-container">
              <Router>
                <EntretienNavBtoB link1="/dashboard/entretiens_b_to_b" link2="/dashboard/entretiens_b_to_b_attente" link3="/dashboard/entretiens_b_to_b_diponibles" />
                <div className="body-conf-table-container">
                
               
                {loading ? (
                    <>
                        <div className="mx-auto text-center mt-5" >
                            <Loader
                             className="m-auto text-center mt-5 " backdrop size="md" content="chargement..." vertical />
                        </div> 
                    </>
                ):(
                      <>
                
              
                    <Route exact path="/dashboard/entretiens_b_to_b" component={()=> <TableEntretiensBtoB 
                      setEtatDemande={setEtatDemande}
                      etat="validé"
                      entretien={dataValide}
                      handleActionShowDetail={dataClickEntretien} 
                     handleActionNewEntretien={handleActionNewEntretien}
                     
                     /> }/>
                     <Route path="/dashboard/entretiens_b_to_b_attente" component={()=> <TableEntretiensBtoB 
                      setEtatDemande={setEtatDemande}
                      etat="attente"
                       entretien={dataAttente}
                       handleActionShowDetail={dataClickEntretien} 
                      handleActionNewEntretien={handleActionNewEntretien}
                      
                      
                      /> }/>
                        <Route path="/dashboard/entretiens_b_to_b_diponibles" component={()=> <TableEntretiensBtoB 
                       entretien={dataAttente}
                       handleActionShowDetail={dataClickEntretien} 
                      handleActionNewEntretien={handleActionNewEntretien}
                      
                      
                      /> }/>

                    </>

                    )}
                </div>

              </Router>

            </div>

          </div>
        </Content>
        </Container>
    </>
    
    )

}