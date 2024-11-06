import { React, useState, useEffect } from 'react';
import Header from '../../components/shared/layout/Header';
import API from '../../services/API';

const Analytics = () => {
    const [data, setData] = useState([]);
    const colors = ['#608BC1', '#9B7EBD', '#D6C0B3', '#FFCCEA', '#859F3D', '#FCF596', '#7FA1C3', '#FFDFD6'];

    const getBloodGroupData = async () => {
        try {
            const response = await API.get('/analytics/bloodGroup-data');
            if (response?.data?.success) {
                setData(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching blood group data:", error);
        }
    };

    useEffect(() => {
        getBloodGroupData();
    }, []);

    return (
        <>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            <Header />
            <div 
                style={{ 
                    backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAACUCAMAAABV5TcGAAAAHlBMVEX///8AAAAZGRkMDAzCwsLIyMgUFBQRERGWlpbLy8tYHYc5AAABQ0lEQVR4nO3QgQnCQADAwH+r1u6/sLVgMRMoeDdByLhfOK1j8eO0zrH48bbO147lPtntN44d87Hd/t72mO8d22Bs547rt1N+wdWOT3aEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRdoQdYUfYEXaEHWFH2BF2hB1hR9gRx44nSvQZHSyveHsAAAAASUVORK5CYII=)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    overflow : 'hidden',
                    gap: '1rem', 
                    padding: '3rem', 
                    justifyContent: 'space-between',
                    minHeight: '100vh'
                }}
                className="d-flex flex-row flex-wrap"
            >
                {data?.map((record, i) => (
                    <div
                        key={record.bloodGroup}
                        className="card"
                        style={{ 
                            flex: '0 1 calc(25% - 1rem)', 
                            backgroundColor: 'white', 
                            color: 'black', 
                            padding: '1em', 
                            marginBottom: '0.5rem', 
                            borderRadius: '8px', 
                            backgroundColor: `${colors[i]}`,
                            
                        }} 
                    >
                        <div className="card-body">
                            <h1 className="card-title bg-dark text-light">{record.bloodGroup}</h1>
                            <p className="card-text">Total In(ml): {record.totalIn || 0}</p>
                            <p className="card-text">Total Out(ml): {record.totalOut || 0}</p>
                            <p className="card-footer text-light bg-dark text-center">
                                Available: {record.availableBlood || 0}(ml)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Analytics;
