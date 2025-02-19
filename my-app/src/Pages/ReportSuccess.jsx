import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ReportSuccess.css'; // Ensure you have a CSS file for styling

function ReportSuccess() {
  return (
    <Container className="text-center success-message-container">
        <div>
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="success-icon" />
     
      <h2>Your report has been recorded</h2>
      <h2>BWSSB will contact you shortly.</h2>
      </div>
    </Container>
  );
}

export default ReportSuccess;
