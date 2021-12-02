import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
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
    ButtonGroup,
    Steps,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import NewEventForm from './NewEventForm';

import './NewEvent.css';

import event1 from '../../../../../assets/images/dashboard/event/event1.jpg'

export default function NewEvent(){
    let history = useHistory();
    const [step, setStep] = React.useState(0);
    const [loadingNext, setLoadingNext] = React.useState(0);
    const [eventIsCreate, setEventIsCreate] = useState(false)
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
    };

    const onNext = () => {
        onChange(step + 1)};
    const onPrevious = () => onChange(step - 1);

    
     useEffect(() => {
        if(step===1){
            setLoadingNext(true)
            setTimeout(() => {
            setLoadingNext(false)
            }, 1000);

    }
    },[step]);

    
  const redirectCreateEvent = () => {
    history.push({
        pathname: '/dashboard/list_events',
        
    });
  }

    // if(eventIsCreate === true){
    //     return (<Redirect to="/dashboard/list_events" />);
    // }
    // else{
    
    return (
        <>
            <section className="container section-general-newEntretien bg-white">
                <div className="mx-auto bg-white card py-2">
                    <div className="header-new-event mb-3 py-3">
                        <h4 className="text-center mx-auto">
                            Enregistrement de nouvel événement
                        </h4>
                     
                    </div>
                    
                    <div className="row">
                 
                    <div className="body-new-event mx-auto text-center  col-12">
                    <div className="py-0 card-new-event-form">

                    <NewEventForm redirectCreateEvent={redirectCreateEvent} setStep={setStep} step={step} loadingNext={loadingNext} /> 
                    </div>
                    </div>


                    </div>
                   
                    <ButtonGroup className="py-5 px-5">

                        <div className="row">
                            <div className="col-6">
                                <Button appearance="ghost" color='violet' className="float-left"  onClick={onPrevious} disabled={step === 0}> 
                                <Icon icon="angle-left" className="mr-3" />
                                Précédent
                                </Button>
                            </div>
                            <div className="col-6">
                                <Button appearance="ghost" color='violet' className="float-right" onClick={onNext} disabled={step === 1}>
                                Suivant  <Icon icon="angle-right" className="ml-3"  />
                                </Button>
                            </div>
                        </div>
                    </ButtonGroup>
                </div>

            </section>

        </>
        )
    // }
}