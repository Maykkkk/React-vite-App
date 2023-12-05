import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Component1 from './components/component1';
import Component2 from './components/component2';

type UserData = {
  name: string;
  phoneNumber: string;
  email: string;
};

const FormPage = ({ onSubmit }: { onSubmit: (data: UserData) => void }) => {
  const [userData, setUserData] = useState<UserData>({ name: '', phoneNumber: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (userData.name && userData.phoneNumber && userData.email) {
      onSubmit(userData);
      setFormSubmitted(true);
    } else {
      alert('Fill all details before submitting.');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Form Page</h1>
          <Routes>
            <Route
              path="/"
              element={
                formSubmitted ? (
                  <Navigate to="/second-page" />
                ) : (
                  <form>
                    <TextField
                      label="Name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </form>
                )
              }
            />
            <Route path="/second-page" element={<Component1 />} />
          </Routes>
        </Col>
      </Row>
      <Row>
        <Col>
          <Routes>
            <Route path="/second-page" element={<Component2 />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  const handleFormSubmit = (data: UserData) => {
    localStorage.setItem('userDetails', JSON.stringify(data));
  };

  return (
    <Router>
      <FormPage onSubmit={handleFormSubmit} />
    </Router>
  );
};


export default App;
