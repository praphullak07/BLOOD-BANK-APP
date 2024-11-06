import { React, useEffect, useState } from 'react';
import Layout from '../../components/shared/layout/Layout';
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Organisation = () => {
    //get current user 
    const {user} = useSelector(state=>state.auth)
    const [data, setData] = useState([]);

    const getOrganisation = async () => {
        try {
            if(user?.role==='donor'){
                const response = await API.get('/inventory/get-organisation');
                if (response.data?.success) {
                setData(response.data.organisations); 
                }
            }
            if(user?.role==='hospital'){
                const response = await API.get('/inventory/get-organisation-for-hospital');
                if (response.data?.success) {
                setData(response.data.organisations); 
                }
            }
            
        } catch (error) {
            console.log('Error fetching organisations:', error);
        }
    };

    useEffect(() => {
        getOrganisation();
    }, [user]);

    return (
        <Layout>
            <div className="content">
                <div className="custom-table-container" style={{ width: '50%' }}>
                    <table className="table custom-table" style={{fontSize: '0.95em' }}>
                        <thead>
                            <tr>
                                <th scope="col">Organisation Name</th>
                                <th scope="col" style={{ width: '150px' }}>Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.organisationName || "N/A"}</td>
                                    <td style={{ wordWrap: 'break-word', maxWidth: '100px', overflow: 'hidden' }}>
                                        {record.email}
                                    </td>
                                    <td>{record.phone}</td>
                                    <td>{record.address}</td>
                                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Organisation;
