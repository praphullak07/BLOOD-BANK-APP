import { React, useEffect, useState } from 'react';
import Layout from '../../components/shared/layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Hospital = () => {
    const [data, setData] = useState([]);
    let requestMade = false;

    const getHospitals = async () => {
        if (requestMade) return;
        requestMade = true;

        try {
            const { data } = await API.get('/inventory/get-hospitals');
            if (data?.success) {
                setData(data.hospitals);
            }
        } catch (error) {
            console.log('Error fetching hospitals:', error);
        }
    };

    useEffect(() => {
        getHospitals();
    }, []);

    return (
        <Layout>
            <div className="content">
                <div className="custom-table-container" style={{width: '50%'}}>
                    <table className="table custom-table" style={{ marginLeft: '10px', marginTop: '20px', fontSize: '0.95em' }}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.hospitalName}</td>
                                    <td>{record.email}</td>
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

export default Hospital;
