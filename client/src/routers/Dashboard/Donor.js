import { React, useEffect, useState } from 'react';
import Layout from '../../components/shared/layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Donor = () => {
    const [data, setData] = useState([]);
    let requestMade = false;
    
    const getDonors = async () => {
        if (requestMade) return;
        requestMade = true;

        try {
            const { data } = await API.get('/inventory/get-donors');
            if (data?.success) {
                setData(data?.donors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDonors();
    }, []);

    return (
        <Layout>
            <div className="content">
                <div className="custom-table-container "style ={{width: '50%'}}>
                    <table className="table custom-table" style={{fontSize: '1em' }}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.name || record.organisationName + " (ORG)"}</td>
                                    <td>{record.email}</td>
                                    <td>{record.phone}</td>
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

export default Donor;
