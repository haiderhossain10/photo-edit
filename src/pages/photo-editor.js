import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import usePanZoom from "use-pan-and-zoom";

import "../styles/photo-editor.scss";

const PhotoEditor = () => {
    const { transform, panZoomHandlers, setContainer, setZoom, setPan, zoom } =
        usePanZoom({
            disableWheel: false,
            enableZoom: true,
            zoomSensitivity: 0.001,
            requireCtrlToZoom: false,
        });

    const onDrop = useCallback((droppedFiles) => {
        console.log(droppedFiles[0]);
    }, []);

    useEffect(() => {
        if (zoom <= 1) {
            setZoom(1);
            setPan({
                x: 0,
                y: 0,
            });
        }
    }, [transform]);

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            multiple: false,
            accept: "image/*",
        });

    const selectedImage = acceptedFiles.length > 0 && (
        <img
            alt={acceptedFiles[0].name}
            key={acceptedFiles[0].path}
            src={URL.createObjectURL(acceptedFiles[0])}
        />
    );

    return (
        <div className="App">
            <div className="photo-editor">
                <div className="photo-viewer">
                    <div
                        className="image-outer-container"
                        ref={(el) => setContainer(el)}
                        {...panZoomHandlers}
                    >
                        <div
                            className="image-inner-container"
                            style={{ transform }}
                        >
                            {selectedImage}
                        </div>
                    </div>
                </div>
                <div className="drop-zone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="text">
                        {isDragActive ? (
                            <p>Drop the images here</p>
                        ) : (
                            <div>
                                <i className="n-icon n-icon-upload"></i>
                                <p>
                                    Drag &amp; Drop or click to select an image
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoEditor;
