import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated import
import './Enquiry.css'; // Make sure to import your CSS file

function Enquiry() {
  const [formData, setFormData] = useState({
    meterId: '',
    ownerName: '',
    comments: '',
    image: null
  });

  const navigate = useNavigate(); // Updated to useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    navigate('/success'); // Redirect to the success page
  };

  const handleCancel = () => {
    // Handle form cancellation
    setFormData({
      meterId: '',
      ownerName: '',
      comments: '',
      image: null
    });
  };

  return (
    <div className="enquiry-page">
      <Container className="text-center page-title-container">
        <h2 className="page-title">Enquiry Page</h2>
      </Container>
      <Container className="enquiry-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMeterId">
            <Form.Label>Meter ID</Form.Label>
            <Form.Control
              type="text"
              name="meterId"
              value={formData.meterId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formOwnerName">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group controlId="formFileUpload">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </Form.Group>

          <div className="button-group">
            <Button variant="secondary" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Report
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Enquiry;
    