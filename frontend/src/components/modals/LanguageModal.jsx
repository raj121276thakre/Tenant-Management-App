// frontend/src/components/modals/LanguageModal.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/**
 * LanguageModal (JSX + Bootstrap)
 * - Shows a list of available languages and lets the user pick one.
 * - Keeps the same UI & behaviour as the original TSX file.
 *
 * Props:
 *  - isOpen: bool
 *  - onClose: func
 *  - availableLanguages: array of { code, label } (optional)
 *  - defaultLanguage: string (optional)
 *  - onSave: func(languageCode)
 */

export default function LanguageModal({
  isOpen,
  onClose,
  availableLanguages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
  ],
  defaultLanguage = 'en',
  onSave,
}) {
  const [selected, setSelected] = useState(defaultLanguage);

  useEffect(() => {
    if (isOpen) {
      setSelected(defaultLanguage);
    }
  }, [isOpen, defaultLanguage]);

  const handleSave = () => {
    if (onSave) onSave(selected);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Language">
      <div className="list-group">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
              selected === lang.code ? 'active' : ''
            }`}
            onClick={() => setSelected(lang.code)}
          >
            <span>{lang.label}</span>
            {selected === lang.code && <span className="badge bg-light text-dark">Selected</span>}
          </button>
        ))}
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button variant="outline" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} fullWidth>
          Save
        </Button>
      </div>
    </Modal>
  );
}

LanguageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  availableLanguages: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, label: PropTypes.string })
  ),
  defaultLanguage: PropTypes.string,
  onSave: PropTypes.func,
};
