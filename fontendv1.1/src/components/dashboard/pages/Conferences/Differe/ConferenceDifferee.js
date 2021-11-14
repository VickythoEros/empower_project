import { useState, useEffect } from 'react';
import {useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        Button,
        Loader,
        ButtonGroup,
        Col,
        Row,
        Panel,


    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './ConferenceDifferee.css';
import NewConferenceDiffereForm from './NewConferenceDiffere/NewConferenceDiffereForm';
import TablesConferenceDiffere from './Tables/TablesConferenceDiffere';



// function participateHomeEvent(events,id){
//       if(events){
//         return events.map((item,index) =>{
//             if(item.participants.length != 0){
            
//                 return item.participants.map(((val,index) =>{
//                     if(val.participant == id) return item
//                 }))

             

//             }else{
//                 return []
//             }
//         } ).filter(element=> element.length != 0 )
//       }
//       else{ return []}
//   }


//   function refactorTable(data){
//     if(data){
//       return data.map((item,index) =>{
//          return item[0]
//       } ).filter(element=> element != undefined )
//     }
//     else{ return []}
// }



// function dateEtatEvent(data){
//     if(data){
//       return data.map((item,index) =>{
//           if(dayMinToNow(item.date_debut,item.heure_debut)){
//               return item
//           }  
//       } ).filter(element=> element != undefined )
//     }
//     else{ return []}
// }


// function dateEtatEventFutur(data){
//     if(data){
//       return data.map((item,index) =>{
//           if(daySupToNow(item.date_debut,item.heure_debut)){
//               return item
//           }  
//       } ).filter(element=> element != undefined )
//     }
//     else{ return []}
// }





export default function ConferenceDifferee(){
    const store = useStore();

    const [loading, setLoading] = useState(false)
    
    const [userData,setUserData]= useState(store.getState().getInfoUser.user.data)

    // useEffect(() => {
    //     evenements.getAllEvenement()
    //         .then((res) => {
             
               
    //         })
    //         .catch((err) => {
    //             console.err(err)
    //         })
        
           
    //     return () => {
            
    //     }
    // }, [])


    return(
        <>
        
        <div className="content-header-body bg-white px-3 py-4">

            <Panel shaded className="" >
            <Row  data-aos="" className=" " >
                <Col  md={24} sm={24} className=" bg-white py-3">
                    <h5 className="">
                       Créer un conférence différée                     
                    </h5>
                                    
                </Col>
                <Col  md={24} sm={24} className=" bg-white py-3">
                    <NewConferenceDiffereForm  />                 
                </Col>
            </Row>
            </Panel>
                                   
          
            <Row  data-aos="" className="mt-1 py-3">
                <Col  md={24} sm={24} className=" bg-white py-3">
                 
                    <h5 className="" style={{color:"orange"}}>
                       Liste des conférences différées                    
                    </h5>  
                </Col>
                <Col  md={24} sm={24} className=" bg-white py-3">
                    <TablesConferenceDiffere />                 
                </Col>
               
                            
            </Row>    

         </div>
        </>
    )
    
}