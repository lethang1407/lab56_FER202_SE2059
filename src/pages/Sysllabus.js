
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";

function Syllabus() {
    const [subjects, setSubjects] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [selectFilter, setSelectFilter] = useState("code");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("user"));

        if (!account) {
            navigate("/");
            return;
        }

        setUser(account);

        const fetchSubjects = async () => {
            try {
                const response = await axios.get("http://localhost:9999/subjects");
                setSubjects(response.data);
            } catch (error) {
                setError("Cannot load subjects!");
            }
        };

        fetchSubjects();

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const kw = search.trim().toLowerCase();

    const filterSubject = subjects.filter((s) => {
        const matchSearch = s[selectFilter]
            .toLowerCase()
            .includes(kw);

        return matchSearch;
    });

    return (
        <div>
            <Row className="bg-info-subtle px-3 py-3">
                <Col md={8}>
                    <h2>FPT Education Learning Materials Portal</h2>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                    <h5 className="mx-3">Hello, {user?.fullName} ({user?.role})</h5>
                    <Button onClick={handleLogout}>Logout</Button>
                </Col>
            </Row>

            <Container className="mt-4">
                <h4 className="mb-3">
                    <b>Sysllabus Management</b>
                </h4>

                <Row className="mt-3 mb-4 d-flex align-items-center">
                    <Form.Label className="w-auto">Search by: </Form.Label>
                    <Form.Select
                        value={selectFilter}
                        onChange={(e) => setSelectFilter(e.target.value)}
                        className="w-25"
                    >
                        <option value="code">Code</option>
                        <option value="name">Name</option>
                    </Form.Select>

                    <Form.Control
                        type="text"
                        placeholder="Enter keyword..."
                        className="w-50 mx-4"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Row>

                <Table striped bordered>
                    <thead className="table-dark">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Curriculum</th>
                            <th>Semester</th>
                            <th>Credits</th>
                            <th>Pre-requisites</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filterSubject.map((s) => (
                            <tr key={s.id}>
                                <td onClick={() => navigate(`/subject/${s.id}`)}>{s.code}</td>
                                <td>{s.name}</td>
                                <td>{s.curriculum}</td>
                                <td>{s.semester}</td>
                                <td>{s.credits}</td>

                                <td>
                                    {s.preRequisites.length > 0
                                        ? s.preRequisites.join(", ")
                                        : "None"}
                                </td>

                                <td>{s.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Syllabus;
