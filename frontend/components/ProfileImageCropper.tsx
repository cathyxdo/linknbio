import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,

} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import { ListProfile } from '@/shared/interfaces'
import 'react-image-crop/dist/ReactCrop.css'

interface ProfileImageCropperProps {
    id: number,
    closeProfileImageModal: () => void,
    handleProfileImageUpdate: (newProfilePhotoUrl: string) => void
}
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }
export default function ProfileImageCropper({id, closeProfileImageModal, handleProfileImageUpdate}: ProfileImageCropperProps) {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          setCrop(undefined) // Makes crop preview update between images.
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            setImgSrc(reader.result?.toString() || ''),
          )
          reader.readAsDataURL(e.target.files[0])
        }
      }
    
        function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
          const { width, height } = e.currentTarget
          setCrop(centerAspectCrop(width, height, 1))
        
        }
        async function onUploadCropClick() {
            const image = imgRef.current;
            const previewCanvas = previewCanvasRef.current;
            
            if (!image || !previewCanvas || !completedCrop) {
              throw new Error('Crop canvas does not exist');
            }
          
            // This will size relative to the uploaded image
            // size. If you want to size according to what they
            // are looking at on screen, remove scaleX + scaleY
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
          
            const offscreen = new OffscreenCanvas(
              completedCrop.width * scaleX,
              completedCrop.height * scaleY,
            );
            const ctx = offscreen.getContext('2d');
            
            if (!ctx) {
              throw new Error('No 2d context');
            }
          
            ctx.drawImage(
              previewCanvas,
              0,
              0,
              previewCanvas.width,
              previewCanvas.height,
              0,
              0,
              offscreen.width,
              offscreen.height,
            );
          
            // Convert the OffscreenCanvas to a blob
            const blob = await offscreen.convertToBlob({
              type: 'image/png',
            });
          
            // Create a FormData object to send the blob data
            const formData = new FormData();
            formData.append('file', blob, `profile-img-${id}.png`);
          
            // Send the FormData to the API endpoint using fetch
            try {
              const response = await fetch(`http://127.0.0.1:8000/api/upload-profile-image/lists/${id}/`, {
                method: 'POST',
                body: formData,
              });
              if (!response.ok) {
                  console.log(response);
                  throw new Error(`Error: ${response.status}`);
              } else {
                const updatedLink : ListProfile = await response.json();
                closeProfileImageModal();
                handleProfileImageUpdate(updatedLink.profile_photo_url);

              }
            } catch (error) {
              console.error('Error uploading image:', error);
            } 
          }
    useDebounceEffect(
        async () => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
            scale,
            rotate,
            )
        }
        },
        100,
        [completedCrop, scale, rotate],
  )
    return (
        <div className="App">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            {!!imgSrc && (
        <>
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            // minWidth={400}
            minHeight={80}
            // circularCrop
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button onClick={onUploadCropClick}>Upload Image</button>
          </div>
        </>
      )}
      </div>
    )
}