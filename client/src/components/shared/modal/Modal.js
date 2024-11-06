import React, { useState } from 'react';
import InputType from '../../shared/forms/InputType';
import API from '../../../services/API';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose }) => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || quantity <= 0 || !email) {
        return toast.error('Please provide all required fields and ensure quantity is greater than 0.');
      }

      const inventoryData = {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity: Number(quantity),
      };
      
      const { data } = await API.post('/inventory/create-inventory', inventoryData);

      if (data?.success) {
        toast.success('New inventory created successfully!');
        onClose();
        window.location.reload();
      } else {
        toast.error(data?.msg || 'Failed to create inventory. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || 'Failed to create inventory. Please try again.');
      } else {
        toast.error('An internal server error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div
        className={`modal ${isOpen ? 'show' : ''}`}
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden={!isOpen}
        style={{
          display: isOpen ? 'block' : 'none',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1050,
          width: '400px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Manage Blood Record</h5>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="modalTitleInput" className="form-label">Manage Blood Record</label>
          </div>

          <div className="mb-3 d-flex align-items-center" style={{ gap: '20px' }}>
            <span
              style={{
                fontWeight: 'bold',
                color: 'black',
                marginTop: '-10px'
              }}
            >
              Blood Type:
            </span>

            <div className="form-check" style={{ marginTop: '20px' }}>
              <input
                type="radio"
                name="inRadio"
                value={'in'}
                defaultChecked
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="inRadio" className="form-check-label">IN</label>
            </div>

            <div className="form-check" style={{ marginTop: '20px' }}>
              <input
                type="radio"
                name="inRadio"
                value={'out'}
                onChange={(e) => setInventoryType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="outRadio" className="form-check-label">OUT</label>
            </div>

            <select
              className="form-select"
              onChange={(e) => setBloodGroup(e.target.value)}
              style={{
                fontSize: '16px',
                padding: '10px 0',
                marginLeft: '10px',
                marginRight: '1cm'
              }}
            >
              <option value="">Open this select menu</option>
              <option value={'O+'}>O+</option>
              <option value={'O-'}>O-</option>
              <option value={'AB+'}>AB+</option>
              <option value={'AB-'}>AB-</option>
              <option value={'A+'}>A+</option>
              <option value={'A-'}>A-</option>
              <option value={'B+'}>B+</option>
              <option value={'B-'}>B-</option>
            </select>
          </div>

          <div className="d-flex mb-3" style={{ gap: '20px' }}>
            <InputType
              labelText={inventoryType === 'out' ? 'Hospital Email' : 'Donor Email'}
              labelFor={'email'}
              inputType={'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputType
              labelText={'Quantity (ml)'}
              labelFor={'quantity'}
              inputType={'number'}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ marginRight: '10px' }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModalSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1040
          }}
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default Modal;
