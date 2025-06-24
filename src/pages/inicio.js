import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Footer from "../components/footer";

function Inicio() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (usuario === 'admin' && contraseña === '123') {
            // Login exitoso - redirigir a robotlist
            navigate('/adopta');
        } else {
            // Mostrar error
            setError('login.error');
        }
    };

    const handleCancel = () => {
        setUsuario('');
        setContraseña('');
        setError('');
    };

    return (
        <React.Fragment>
            <Container className="mt-4">
                {/* Título principal */}
                <Row className="mb-4">
                    <Col className="text-center">
                        <h1 className="display-4 fw-bold">
                            <FormattedMessage id="app.title" />
                        </h1>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col className="text-center">
                        <div style={{
                            backgroundColor: '#ffff', 
                            padding: '10px',
                            borderRadius: '15px',
                            display: 'inline-block'
                        }}>
                            <img 
                                src="/robots.png" 
                                alt=""
                                style={{ maxWidth: '85%', height: 'auto' }}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <h3 className="text-center mb-4">
                                    <FormattedMessage id="login.title" />
                                </h3>
                                
                                {error && (
                                    <Alert variant="danger" className="mb-3">
                                        <FormattedMessage id={error} />
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">
                                            <FormattedMessage id="login.username" />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            style={{ backgroundColor: '#CCCCCC' }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold">
                                            <FormattedMessage id="login.password" />
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={contraseña}
                                            onChange={(e) => setContraseña(e.target.value)}
                                            style={{ backgroundColor: '#CCCCCC' }}
                                            required
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col xs={6}>
                                            <Button 
                                                type="submit" 
                                                className="w-100"
                                                style={{ 
                                                    backgroundColor: '#1B4F8C', 
                                                    border: 'none',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                <FormattedMessage id="login.submit" />
                                            </Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button 
                                                type="button"
                                                onClick={handleCancel}
                                                className="w-100"
                                                style={{ 
                                                    backgroundColor: '#E74C3C', 
                                                    border: 'none',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                <FormattedMessage id="login.cancel" />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            <Footer />
        </React.Fragment>
    );
}

export default Inicio;