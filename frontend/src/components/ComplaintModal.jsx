import React, { useState } from 'react';
import "../Styles/Modal.css";

const ComplaintModal = ({ complaint, onClose, onUpdateStatus, isAdmin }) => {
  const [feedback, setFeedback] = useState(complaint.adminFeedback || "");

  if (!complaint) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{complaint.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="info-grid">
            <p><strong>Category:</strong> {complaint.category}</p>
            <p><strong>Status:</strong> 
              <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                {complaint.status}
              </span>
            </p>
          </div>
          
          <div className="description-box">
            <p><strong>Description:</strong></p>
            <p className="text-content">{complaint.description}</p>
          </div>

          <div className="feedback-section">
            <p><strong>Admin Feedback:</strong></p>
            {isAdmin ? (
              <>
                <textarea 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Explain the reason for rejection or resolution steps..."
                />
                <div className="modal-actions">
                  <button 
                    className="btn-resolve" 
                    onClick={() => onUpdateStatus(complaint._id, "resolved", feedback)}
                  >
                    Resolve with Feedback
                  </button>
                  <button 
                    className="btn-reject" 
                    onClick={() => onUpdateStatus(complaint._id, "rejected", feedback)}
                  >
                    Reject with Feedback
                  </button>
                </div>
              </>
            ) : (
              <p className="feedback-text">
                {complaint.adminFeedback || "No feedback provided yet."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;