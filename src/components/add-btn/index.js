import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import IModal from "./../modal/index";

const AddBtn = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ background: '#faad14'}}/>   
            <IModal open={open} setOpen={setOpen}/>
        </>
        )
}

export default AddBtn;