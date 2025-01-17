import React, {useEffect, useState} from 'react';
import UploadModal from '../components/UploadModal';
import { useNavigate } from 'react-router-dom';
import { fetchImages } from '../utils/api'

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    // PLACEHOLDER DUMMY CONTENT replaced by load images below
    // useEffect(() => {
    //     setImages([
    //         {id: 1, src: 'https://via.placeholder.com/150', metadata: 'Image 1'},
    //         {id: 2, src: 'https://via.placeholder.com/150', metadata: 'Image 2'},
    //     ]);
    // }, []);
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if(!isLoggedIn) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const fetchedImages = await fetchImages();
                setImages(fetchedImages);
            }
            catch(err) {
                console.error('Error fetching images:', err);
            }
        };
        loadImages();
    })

    const handleSaveImage = (croppedImage) => {
        setImages([...images, {id: images.length+1, croppedImage, metadata: 'Custom metadata'}]);
    }

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
            {isModalOpen && (<UploadModal onClose={() => setModalOpen(false)} onSave={handleSaveImage}/>)}
        </div>
    )
}

export default Dashboard;