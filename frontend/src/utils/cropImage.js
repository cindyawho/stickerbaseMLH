export const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
        console.log('Crop object:', crop); // Debug log
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = crop.width;
            canvas.height = crop.height;

            try {
                ctx.drawImage(
                    image,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height
                );
            } catch (error) {
                console.error('Error drawing image on canvas:', error); // Debug log
                reject(error);
            }

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log('Generated blob:', blob); // Debug log
                        resolve(blob);
                    } else {
                        reject(new Error('Canvas is empty or failed to generate blob'));
                    }
                },
                'image/jpeg',
                1
            );
        };
        image.onerror = (error) => {
            console.error('Error loading image:', error); // Debug log
            reject(error);
        };
    });
};