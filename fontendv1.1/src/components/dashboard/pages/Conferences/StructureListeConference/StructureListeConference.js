
import { useState, useEffect } from 'react';
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import './StructureListeConference.css';



export default function StructureListeConference() {
   const [conferences, setConferences] = useState(props.conferences)

   useEffect(() => {
       setConferences(props.conferences)
   }, [props.conferences])
    
    
    return (
    <>
        <div className="container-fluid">
            <div className="row mx-auto">
            <h4 className="h4">
                {conferences.titre}
            </h4>
            

            </div>
        </div>

    </>
    
    )

}