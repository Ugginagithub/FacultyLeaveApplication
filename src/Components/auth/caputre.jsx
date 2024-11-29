import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [webcamOpen, setWebcamOpen] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const captureImage = () => {
    const capturedImageSrc = webcamRef.current.getScreenshot();
    setImage(capturedImageSrc);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {!webcamOpen && (
        <button
          onClick={() => setWebcamOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Open Webcam
        </button>
      )}

      {webcamOpen && (
        <>
          <Webcam
            audio={false}
            height={350}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <div>
            <button
              onClick={captureImage}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Capture
            </button>
          </div>
        </>
      )}

      {image && (
        <div style={{ marginTop: '20px' }}>
          <h3>Captured Image:</h3>
          <img
            src={image}
            alt="Captured"
            style={{
              width: '350px',
              height: 'auto',
              border: '2px solid #ddd',
              borderRadius: '10px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
