import React, { useEffect, useState } from "react";
import Layout from "../components/shared/layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const {user} = useSelector(state=>state.auth);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate( )

  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-inventory');
      const { data } = response; 
      
      if (data?.success) {
        setData(data?.inventory);
      } else {
        console.error('Failed to fetch inventory:', data?.msg); 
      }

    } catch (error) {
      console.error('Error fetching blood records:', error); 
    }
  }

  useEffect(() => {
    getBloodRecords();
  }, []);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin ')}
      <div className="content-area">
        <h1>BLOOD BANK APP</h1>

        {/* Inventory Section */}
        <h4 
        onClick={handleOpenModal}
        style={{ cursor: 'pointer', color: 'black', marginLeft: '7cm' }} 
        >
        <i className="fa-solid fa-plus" style={{ color: 'green', marginRight: '5px' }}></i> 
        Add Inventory
        </h4>

        <div className="custom-table-container" style={{ width: '50%' }}>
          <table className="table custom-table" style={{fontSize:'1em'}}>
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity (ml)</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time & Date</th>
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

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </Layout>
  );
};

export default HomePage;
