import React ,{useEffect,useState} from 'react'
import Layout from '../../components/shared/layout/Layout'
import API from '../../services/API'
import moment from 'moment';

const DonorList = () => {
  const [data, setData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
    const getDonors = async () => {
      
        try {
            const res = await API.get('/admin/donor-list');
            if (res.data?.success) {
                setData(res.data.donorData);
                setDeleteMessage(''); 
            }
        } catch (error) {
            console.log(error);
        }
    };


    //delete function

    const handleDelete = async(id)=>{
      try{
        let ans = window.prompt("are you sure? you want to delete this donor","sure")
        if(!ans)
        {
            return
        }
        const {data} = await API.delete(`/admin/delete-fields/${id}`)
        if (data?.success) {
          alert(data.msg);
          setData((prevData) => prevData.filter((record) => record._id !== id));
          setDeleteMessage(data.msg || 'Donor record deleted'); 
      } else {
          console.log("Error deleting donor");
      }
      }
      catch(error)
      {
        console.log(error)
      }

    }

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
                                <th scope="col">Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.name || record.organisationName + " (ORG)"}</td>
                                    <td>{record.email}</td>
                                    <td>{record.phone}</td>
                                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                                    <td>
                                      <button className='btn btn-danger' style={{backgroundColor:'black',color:'white'}} 
                                      onClick={()=>{

                                          handleDelete(record._id)
                                      }}>
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

export default DonorList;
