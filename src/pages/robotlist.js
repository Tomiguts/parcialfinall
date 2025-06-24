import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Footer from "../components/footer";

function Robotlist() {
    const [robots, setRobots] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRobots();
    }, []);

    const fetchRobots = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://gist.githubusercontent.com/josejbocanegra/aa5fb56863c326ebb3d558f8a225d223/raw/5c55db5012e5fc24862e05847ff1f2927aea11db/robots.json');
            
            if (!response.ok) {
                throw new Error('Network error');
            }
            
            const data = await response.json();
            setRobots(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRobotClick = (robot) => {
        setSelectedRobot(robot);
    };

    const handleBackToList = () => {
        setSelectedRobot(null);
    };

    const RobotsTable = () => (
        <Container className="mt-4">
            <h2 className="text-center mb-4">
                <FormattedMessage id="robots.listTitle" />
            </h2>
            
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">
                            <FormattedMessage id="robots.loading" />
                        </span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="text-center">
                    <FormattedMessage 
                        id="robots.error" 
                        values={{ error: error }}
                    />
                </Alert>
            )}

            {!loading && !error && (
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow">
                            <Table 
                                hover 
                                responsive 
                                className="mb-0"
                                style={{ cursor: 'pointer' }}
                            >
                                <thead style={{ backgroundColor: '#6c757d', color: 'white' }}>
                                    <tr>
                                        <th className="py-3 px-4">
                                            <FormattedMessage id="robots.tableId" />
                                        </th>
                                        <th className="py-3 px-4">
                                            <FormattedMessage id="robots.tableName" />
                                        </th>
                                        <th className="py-3 px-4">
                                            <FormattedMessage id="robots.tableModel" />
                                        </th>
                                        <th className="py-3 px-4">
                                            <FormattedMessage id="robots.tableManufacturer" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {robots.map((robot, index) => (
                                        <tr 
                                            key={robot.id}
                                            onClick={() => handleRobotClick(robot)}
                                            style={{ 
                                                backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#e3f2fd';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white';
                                            }}
                                        >
                                            <td className="py-3 px-4 fw-bold text-primary">{robot.id}</td>
                                            <td className="py-3 px-4">{robot.nombre}</td>
                                            <td className="py-3 px-4">{robot.modelo}</td>
                                            <td className="py-3 px-4">{robot.empresaFabricante}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );

    const RobotDetail = ({ robot }) => (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleBackToList}
                        className="mb-3"
                    >
                        <FormattedMessage id="robots.backToList" />
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col lg={6} className="mb-4">
                    <Card className="shadow">
                        <Card.Img 
                            variant="top" 
                            src={robot.imagen} 
                            alt={robot.nombre}
                            style={{ 
                                height: '400px', 
                                objectFit: 'cover',
                                backgroundColor: '#f8f9fa'
                            }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x400/6c757d/ffffff?text=Robot';
                            }}
                        />
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card className="shadow h-100">
                        <Card.Header as="h3" className="bg-primary text-white">
                            {robot.nombre}
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailId" /></strong>
                                </Col>
                                <Col sm={7}>{robot.id}</Col>
                            </Row>
                            
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailModel" /></strong>
                                </Col>
                                <Col sm={7}>{robot.modelo}</Col>
                            </Row>
                            
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailManufacturer" /></strong>
                                </Col>
                                <Col sm={7}>{robot.empresaFabricante}</Col>
                            </Row>
                            
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailYear" /></strong>
                                </Col>
                                <Col sm={7}>{robot.añoFabricacion}</Col>
                            </Row>
                            
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailProcessing" /></strong>
                                </Col>
                                <Col sm={7}>{robot.capacidadProcesamiento}</Col>
                            </Row>
                            
                            <Row className="mb-3">
                                <Col sm={5}>
                                    <strong><FormattedMessage id="robots.detailPersonality" /></strong>
                                </Col>
                                <Col sm={7}>
                                    <div style={{ 
                                        backgroundColor: '#f8f9fa', 
                                        padding: '15px', 
                                        borderRadius: '8px',
                                        fontStyle: 'italic',
                                        border: '1px solid #dee2e6'
                                    }}>
                                        "{robot.humor}"
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        
                        <Card.Footer className="text-center">
                            <Button 
                                variant="success" 
                                size="lg"
                                style={{ 
                                    minWidth: '200px',
                                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                                    border: 'none'
                                }}
                            >
                                <FormattedMessage 
                                    id="robots.adoptButton" 
                                    values={{ name: robot.nombre }}
                                />
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    return (
        <React.Fragment>
            <Container>
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
                                src="/robots2.png" 
                                alt=""
                                style={{ maxWidth: '85%', height: 'auto' }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>

            {selectedRobot ? (
                <RobotDetail robot={selectedRobot} />
            ) : (
                <RobotsTable />
            )}

            <Footer />
        </React.Fragment>
    );
}

export default Robotlist;