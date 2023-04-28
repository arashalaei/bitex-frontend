import React, {useState} from "react";
import IForm from "../add-form";
import { StyledModal } from "./styles";



const IModal = ({open, setOpen}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return(
        <StyledModal
            title="Adding a new Key-Value"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            
            <IForm setOpen={setOpen}/>
        </StyledModal>
    )
}

export default IModal;