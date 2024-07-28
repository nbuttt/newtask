import React, { useState, useCallback } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { BiImageAdd } from 'react-icons/bi'; // Import the icon

const ModalView = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoom, setZoom] = useState(1);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = useCallback(() => {
    if (cropper) {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  }, [cropper]);

  const handleSave = () => {
    setOpen(false);
  };

  const handleZoomChange = (event) => {
    const zoomValue = parseFloat(event.target.value);
    setZoom(zoomValue);
    if (cropper) {
      cropper.zoomTo(zoomValue);
    }
  };

  const handleSaveAndCrop = () => {
    handleCrop(); // Crop the image
    handleSave(); // Save and close the modal
  };

  return (
    <div>
      <button onClick={onOpenModal}>Upload Image</button>
      <Modal open={open} onClose={onCloseModal} center>
        <div style={{ position: 'relative', width: '200px' }}>
          <div className="upload-container" style={{ marginBottom: '10px' }}>
            <label htmlFor="file-upload" className="custom-upload-icon">
              <BiImageAdd size={32} /> {/* Display icon */}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the actual input
            />
          </div>
          {image && (
            <div>
              <Cropper
                src={image}
                style={{ height: 400, width: '100%' }}
                aspectRatio={4 / 3} // Landscape aspect ratio
                guides={false}
                zoom={zoom}
                onInitialized={(instance) => setCropper(instance)}
              />
              <div style={{ marginTop: 10 }}>
                
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    style={{ width: '100%', marginBottom: 10  }}
                    onChange={handleZoomChange}
                  />
              </div>
              <div>
                <button style={{ width: '100%', marginBottom: 10  }} 
                onClick={handleSaveAndCrop}>Save</button>
            </div>
            </div>
          )}
        </div>
      </Modal>
        {croppedImage && (
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10,
          }}>
            <img src={croppedImage} alt="Cropped" style={{ maxWidth: 200, border: '2px solid #ddd', borderRadius: '8px' }} />
          </div>
        )}
    </div>
  );
};

export default ModalView;
