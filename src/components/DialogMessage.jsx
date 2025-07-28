import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

const DialogMessage = ({ isOpen, onClose, title, message, type = 'info', showRetry = false, onRetry }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={24} color="#e53e3e" />;
      case 'success':
        return <CheckCircle size={24} color="#38a169" />;
      default:
        return <Info size={24} color="#3182ce" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'error':
        return '#e53e3e';
      case 'success':
        return '#38a169';
      default:
        return '#3182ce';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-card"
          style={{
            maxWidth: '400px',
            width: '100%',
            padding: '2rem',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4a5568',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
            }}
          >
            <X size={20} />
          </button>

          {/* Icon and Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {getIcon()}
            <h3 style={{
              margin: 0,
              color: getTitleColor(),
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              {title}
            </h3>
          </div>

          {/* Message */}
          <p style={{
            margin: '0 0 1.5rem 0',
            color: '#4a5568',
            lineHeight: '1.6',
            fontSize: '1rem'
          }}>
            {message}
          </p>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2c5282';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3182ce';
                }}
              >
                Retry
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#1a202c',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DialogMessage; 