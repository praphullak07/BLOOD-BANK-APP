import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/layout/Layout';
import moment from 'moment';
import API from '../../services/API';

const HospitalList = () => {
    const [data, setData] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState('');

    const getHospitals = async () => {
        try {
            const res = await API.get('/admin/hospital-list');
            if (res.data?.success) {
                setData(res.data.hospData);
                setDeleteMessage(''); // Clear any previous delete message
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Delete function
    const handleDelete = async (id) => {
        try {
            let ans = window.prompt("Are you sure you want to delete this hospital?", "sure");
            if (!ans) {
                return;
            }
            const { data } = await API.delete(`/admin/delete-fields/${id}`);
            if (data?.success) {
                alert(data.msg);
                setData((prevData) => prevData.filter((record) => record._id !== id));
                setDeleteMessage(data.msg || 'Hospital record deleted'); 
            } else {
                console.log("Error deleting Hospital");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHospitals();
    }, []);

    return (
        <Layout>
            <div className="content">
                <div className="custom-table-container" style={{ width: '50%' }}>
                    <table className="table custom-table" style={{ fontSize: '1em' }}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.hospitalName}</td>
                                    <td>{record.email}</td>
                                    <td>{record.phone}</td>
                                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            style={{ backgroundColor: 'black', color: 'white' }}
                                            onClick={() => {
                                                handleDelete(record._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default HospitalList;
