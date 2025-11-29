// frontend/src/components/modals/UploadIdProofModal.jsx
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/**
 * UploadIdProofModal (JSX + Bootstrap)
 * - Allows selecting/uploading an ID proof image/file.
 * - Keeps original UI and interactions (preview, remove, upload).
 *
 * Props:
 *  - isOpen: bool
 *  - onClose: func
 *  - onUpload: func(file)  // callback when user uploads file
 *  - initialFile: object (optional) { name, url }
 */

export default function UploadIdProofModal({ isOpen, onClose, onUpload, initialFile = null }) {
  const [file, setFile] = useState(initialFile);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      // Create a temporary preview URL — for real app, upload to backend instead
      const url = URL.createObjectURL(f);
      setFile({ file: f, name: f.name, url });
    }
  };

  const handleRemove = () => {
    if (file?.url && file.file) {
      // revoke the preview URL to free memory
      URL.revokeObjectURL(file.url);
    }
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleUpload = () => {
    if (!file) return;
    if (onUpload) {
      onUpload(file.file || file); // pass original File object if available
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload ID Proof">
      <div className="mb-3">
        <label className="form-label">Choose file</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="mb-3">
          <div className="d-flex align-items-center gap-3">
            {file.url ? (
              <img
                src={file.url}
                alt={file.name}
                style={{ width: 100, height: 70, objectFit: 'cover' }}
                className="rounded border"
              />
            ) : (
              <div className="border rounded p-2" style={{ width: 100, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <small>{file.name}</small>
              </div>
            )}
            <div className="flex-fill">
              <div className="fw-semibold">{file.name}</div>
              <div className="text-muted small">Selected file</div>
            </div>

            <div className="d-flex flex-column gap-2">
              <Button variant="outline" onClick={handleRemove}>
                Remove
              </Button>
              <Button variant="primary" onClick={handleUpload}>
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {!file && (
        <div className="text-muted small">No file selected. Choose a file to upload ID proof.</div>
      )}

      <div className="mt-2 d-flex justify-content-end">
        <Button variant="link" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

UploadIdProofModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
  initialFile: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};
