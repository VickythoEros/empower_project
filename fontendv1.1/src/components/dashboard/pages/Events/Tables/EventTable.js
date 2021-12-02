import React,{useState,useEffect} from 'react'
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, } = Table;


function dataDebut(date){
  var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  var d =  new Date(date)
  
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}

function dataMinute(date){
  
  var d =  new Date(date)
  var min =`${d.getMinutes()}`
  
  return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
}


function constitueData(data){
  return data.map((item,index)=>{
    return {
      ...item,
      heure_debut: dataMinute(item.heure_debut),
      date_debut: dataDebut(item.date_debut),
      heure_fin: dataMinute(item.heure_debut),
      date_fin: dataDebut(item.date_debut),
   
  }})
}

 function EventTable(props) {
   
    const [data, setData] = useState(constitueData(props.listEvent))
    


     useEffect(()=>{
    
        setData(constitueData(props.listEvent))
     },[props.listEvent])



      return (
        <div>
          <Table
          fluid
          virtualized={true}
            height={400}
            data={data}
            onRowClick={data => {
              props.handleActionShowDetail(data)
            }}
          >
            
            <Column width={300} >
              <HeaderCell style={{background:'#1ea',color:"#fff"}}>Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={300}>
              <HeaderCell style={{background:'#1ea',color:"#fff"}}>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
            <Column width={300}>
              <HeaderCell style={{background:'#1ea',color:"#fff"}}>Date début</HeaderCell>
              <Cell dataKey="date_debut" />
            </Column>

            <Column width={300}>
              <HeaderCell style={{background:'#1ea',color:"#fff"}}>Heure début</HeaderCell>
              <Cell dataKey="heure_debut" />
            </Column>
  
          
          </Table>
        </div>
      );
    
  }
  
  
  export default EventTable;
  