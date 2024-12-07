import React, {useEffect, useState} from 'react';
import UploadModal from '../components/UploadModal';
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if(!isLoggedIn) {
            navigate('/');
        }
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => setModalOpen(true)}>Upload New Image</button>
            <div>
                {images.map((image) => (
                    <div key = {image.id}>
                        <img src={image.src} alt={image.metadata} style={{width:'150px', height:'150px'}} />
                        <p>{image.metadata}</p>
                    </div>
                ))}
            </div>
            {isModalOpen && (<UploadModal onClose={() => setModalOpen(false)}/>)}
        </div>
    )
}

export default Dashboard;