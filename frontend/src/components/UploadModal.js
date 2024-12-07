import React, {useState, useCallback} from 'react';
import Cropper from 'react-easy-crop';
import {getCroppedImg} from '../utils/cropImage';

const UploadModal = ({onClose}) => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try{
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            const formData = new FormData();
            formData.append('image', croppedImage, 'cropped-image.jpg');
            formData.append('metadata', 'Custom metadata');
            
            // const uploadedImage = await uploadImage(formData);
            // onmouseleave(uploadedImage);
            onClose();
        } catch (err) {
            console.error('Error cropping image: ', err);
        }
    };

    return(
        <div>
            <h2>Upload New Image</h2>
            {!image ? (
                <input type='file' accept='image/*' onChange={handleFileChange} />
            ) : (
                <div style={{position:'relative'}}>
                    <Cropper 
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        objectFit='vertical-cover'
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            )}
            <button onClick={onClose}>Cancel</button>
            {image && <button onClick={handleSave}>Save</button>}
        </div>
    );
}

export default UploadModal;