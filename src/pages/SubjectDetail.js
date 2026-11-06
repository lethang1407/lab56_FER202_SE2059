import { Button, Card, Col, Container, Row } from "react-bootstrap";

function SubjectDetail() {

    return (
        <div>
            <Row className="bg-info-subtle px-3 py-3">
                <Col md={8}>
                    <h2>
                        Subject Detail Management
                    </h2>
                </Col>
            </Row>

            <Container className="mt-4">
                <Card className="w-50">
                    <Card.Body>
                        <Card.Title>Subject Information</Card.Title>
                        <Card.Text>Code: </Card.Text>
                        <Card.Text>Name: </Card.Text>
                        <Card.Text>Curriculum: </Card.Text>
                        <Card.Text>Semester: </Card.Text>
                        <Card.Text>Credits: </Card.Text>
                        <Card.Text>Pre-equisites: </Card.Text>
                        <Card.Text>Description: </Card.Text>

                        <Row>
                            <Col>
                                <Button>Edit</Button>
                            </Col>
                            <Col className="text-end">
                                <Button>Delete</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default SubjectDetail;