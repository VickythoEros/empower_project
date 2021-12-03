import { useEffect,useState } from "react";
import { useLocation ,useHistory} from "react-router-dom";
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import NewConferenceForm from "./NewConferenceForm";
import postes from '../../../../api/poste'
import './NewConference.css';

import conf from '../../../../assets/images/dashboard/conferences/conf2.jpg'

export default function NewConference(){
  
    let history = useHistory();
    
    
    const redirectCreateConference = () => {
        history.push({
            pathname: '/dashboard/conferences',
            
        });
      }
    
    return (
        <>
            <div className="container bg-white">
                <div className="mx-auto">
                    <div className="header-new-conference mt-2 mb-3 py-3 text-center mx-auto">
                        <h4 className="text-center mx-auto">
                            Enregistrement d'une nouvelle conférence
                        </h4>
                     
                    </div>
                    <div className="body-new-conference row p-4">

                            <NewConferenceForm redirectCreateConference={redirectCreateConference} /> 
                    

                    </div>

                </div>

            </div>

        </>
        )
}