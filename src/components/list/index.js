import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined, SyncOutlined, FieldTimeOutlined } from '@ant-design/icons';
// import type { TableColumnsType } from 'antd';
import {  Table, Space, Button,Tooltip, Modal, notification, Form, Input  } from 'antd';
import { API_URL } from './../../assets/data';
import axios from "axios";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
const { confirm } = Modal;



const IList = () => {

    const [data, setData] = useState([]);
    const inputRef = useRef();
    // const [updatedValue, setUpdatedValue] = useState('');
    const { data: d } = useSWR(`${API_URL}api/v1/data`, fetcher, { refreshInterval: 1000 })
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    useEffect(() => {
        if(d)
            setData(d.data.data);
    }, [d])

    const openNotificationWithIcon = (type, message) => {
        api[type]({
        message,
        placement: 'topLeft'
        });
    };

    const onDelete = async(record) => {
        const res = await axios.delete(`${API_URL}api/v1/data/${record._id}`)
            if(res.status === 204){
                openNotificationWithIcon('success', 'deleted Successfully')
                const newData = data.filter(item => item._id !== record._id);
                setData(newData);
            }
        }

    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure delete this item?',
            icon: <DeleteOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    await onDelete(record)
                } catch (error) {
                    openNotificationWithIcon('error', 'Something went wrong!')
                }
            },
        });
    };
    const onFinish = async ({_id}) => {
        const newValue = inputRef.current.input.value;
        if(newValue){
            try {
                const res = await axios.patch(`${API_URL}api/v1/data/${_id}`,{value: newValue});
                if(res.status === 200){
                    openNotificationWithIcon('success', 'updated Successfully')
                }else{
                    openNotificationWithIcon('error', 'Something went wrong!')
                }
            } catch (error) {
                openNotificationWithIcon('error', 'Something went wrong!')
            }finally{
                form.resetFields();
            }
        }
    };

    const updateModal = (record) => {
        Modal.info({
          title: 'Update',
          okText: 'update',
          icon:<SyncOutlined/>,
          closable: true,	
          content: (
            <div>
                <Form form={form} name="horizontal_login" layout="inline">
                    <Form.Item
                        name="key"
                        rules={[{ required: true, message: 'Enter the key' }]}
                        style={{width: '44%'}}
                    >
                        <Input placeholder={record.key} disabled/>
                    </Form.Item>
    
                    <Form.Item
                        name="value"
                        rules={[{ required: true, message: 'Enter the new value' }]}
                        style={{width: '44%'}}
                    >
                        <Input
                            placeholder="Value"
                            ref={inputRef}
                        />
                    </Form.Item>
                </Form>
            </div>
        ),
        async onOk() {
            await onFinish(record)
        },
        });
    
    };

    const historyModal = ({history}) => {
        console.log(history);
        Modal.warning({
            title: 'History',
            icon: <FieldTimeOutlined />,
            closable: true,
            okButtonProps:{style:{background: 'rgb(250, 173, 20)'}},
            content: (
                <div style={{width: '80%', margin: '0 auto'}}>
                    {
                        history.length 
                            ? 
                            <div>
                                <div style={{display: 'flex', justifyContent:'space-between'}}>
                                    <div><strong>Value</strong></div>
                                    <div><strong>Date</strong></div>
                                </div>
                                {
                                history.map((h, idx) => <div key={idx} style={{display: 'flex', justifyContent:'space-between'}}>
                                <div>{h.value}</div>
                                <div>{new Date(h.date).toLocaleDateString()}</div>
                                </div>)
                                }
                            </div>

                            : "There is no history!"
                    }
                </div>
            ),
        });
      };

    const columns = [
        {
            title: 'Key', 
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
        },
        {
            title: 'Value', 
            dataIndex: 'value',
            key: 'value',
            fixed: 'left',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title={"Update"}>
                        <Button type="primary"  icon={<SyncOutlined />} onClick={() => updateModal(record)}/>
                    </Tooltip>
                    <Tooltip placement="top" title={"History"}>
                        <Button type="primary" style={{background: 'rgb(250, 173, 20)'}} icon={<FieldTimeOutlined />} onClick={() => historyModal(record)}/>
                    </Tooltip>
                        <Tooltip placement="top" title={"Delete"}>
                            <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)}/>
                        </Tooltip>
                </Space>
            ),
        },
    ]

    

    return(
            <>
                {contextHolder}
                <Table 
                    pagination={{position: [ 'bottomCenter']}}
                    columns={columns} 
                    dataSource={data} 
                />
            </>
            
    )

    }
export default IList;