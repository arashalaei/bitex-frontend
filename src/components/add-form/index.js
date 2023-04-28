import React, {useState} from "react";
import { Button, Form, Input, notification } from 'antd';
import { API_URL } from './../../assets/data';
import axios from "axios";

const IForm = ({setOpen}) => {
    
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message) => {
        api[type]({
        message,
        placement: 'topLeft'
        });
    };

    const onFinish = async ({key, value}) => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}api/v1/data`, {key, value});
            if(res.status === 201){
                openNotificationWithIcon('success', 'Added Successfully')
            }else{
                openNotificationWithIcon('error', 'Something went wrong!')
            }
        } catch (error) {
            openNotificationWithIcon('error', 'Something went wrong!')
        } finally{
            setOpen(false);
            setLoading(false)
        }
    };

    return(
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            {contextHolder}
        <Form.Item
            name="key"
            rules={[{ required: true, message: 'Enter the key' }]}
            style={{width: '46%'}}
        >
            <Input placeholder="Key" />
        </Form.Item>

        <Form.Item
            name="value"
            rules={[{ required: true, message: 'Enter the value' }]}
            style={{width: '46%'}}
        >
            <Input
                placeholder="Value"
            />
        </Form.Item>
    <Form.Item shouldUpdate>
        {() => (
        <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#faad14', marginTop: '10px'}}
            loading={loading}
        >
            Add
        </Button>
        )}
    </Form.Item>
        </Form>
    )


};

export default IForm;