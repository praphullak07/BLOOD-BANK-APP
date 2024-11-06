import {React,useState,useEffect} from 'react'
import API from '../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Layout from '../components/shared/layout/Layout';

const Donations = () => {
    const {user} = useSelector(state=>state.auth)
    const [data, setData] = useState([]);
    let requestMade = false;
    
    const getDonors  = async () => {
        if (requestMade) return;
        requestMade = true;

        try {
            const { data } = await API.post('/inventory/get-inventory-hospital',{
                filters : {
                    inventoryType : 'in',
                    donor : user?._id
                }
            });
            if (data?.success) {
                setData(data?.inventory);
                console.log(data);
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
                    <table className="table custom-table" style={{fontSize: '0.95em' }}>
                        <thead>
                            <tr>
                                <th scope="col">Blood Group</th>
                                <th scope="col">Inventory Type</th>
                                <th scope="col">Quantity </th>
                                <th scope="col">Email </th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.bloodGroup}</td>
                                    <td>{record.inventoryType}</td>
                                    <td>{record.quantity}</td>
                                    <td>{record.email}</td>
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

export default Donations