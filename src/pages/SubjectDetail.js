
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function SubjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState(null);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9999/subjects/${id}`
                );

                setSubject(response.data);
            } catch (error) {
                console.log("Cannot load subject!");
            }
        };

        fetchSubject();
    }, [id]);

    if (!subject) {
        return <Container className="mt-4">Loading...</Container>;
    }

    return (
        <div>
            <Row className="bg-info-subtle px-3 py-3">
                <Col md={8}>
                    <h2>Subject Detail Management</h2>
                </Col>
            </Row>

            <Container className="mt-4 d-flex justify-content-center">
                <Card className="w-50">
                    <Card.Body>
                        <Card.Title>Subject Information</Card.Title>

                        <Card.Text>
                            <b>Code:</b> {subject.code}
                        </Card.Text>

                        <Card.Text>
                            <b>Name:</b> {subject.name}
                        </Card.Text>

                        <Card.Text>
                            <b>Curriculum:</b> {subject.curriculum}
                        </Card.Text>

                        <Card.Text>
                            <b>Semester:</b> {subject.semester}
                        </Card.Text>

                        <Card.Text>
                            <b>Credits:</b> {subject.credits}
                        </Card.Text>

                        <Card.Text>
                            <b>Pre-requisites:</b>{" "}
                            {subject.preRequisites.length > 0
                                ? subject.preRequisites.join(", ")
                                : "None"}
                        </Card.Text>

                        <Card.Text>
                            <b>Description:</b> {subject.description}
                        </Card.Text>

                        <Row>
                            <Col>
                                <Button>
                                    Edit
                                </Button>
                            </Col>

                            <Col className="text-end">
                                <Button>
                                    Delete
                                </Button>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default SubjectDetail;
