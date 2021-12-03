import { useEffect,useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
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
import NewFormationForm from "./NewFormationForm";
import postes from '../../../../api/poste'
import './NewFormation.css';

import conf from '../../../../assets/images/dashboard/conferences/conf2.jpg'

export default function NewFormation(){
    let history = useHistory();
    
    
    const redirectCreateFormation = () => {
        history.push({
            pathname: '/dashboard/formations',
            
        });
      }
    
    

    return (
        <>
            <div className="container bg-white">
                <div className="mx-auto">
                    <div className="header-new-foramtion mt-2 mb-3 py-3 text-center mx-auto">
                        <h4 className="text-center mx-auto">
                            Enregistrement d'une nouvelle Formation
                        </h4>
                        {/* <p className="text-center">Veuillez bien renseigner les informations</p> */}
                    </div>
                    <div className="body-new-conference row p-4">

                            <NewFormationForm redirectCreateFormation={redirectCreateFormation} /> 
                      
                    </div>

                </div>

            </div>

        </>
        )
}