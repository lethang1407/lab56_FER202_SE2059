
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:9999/accounts");

            const account = response.data.find(
                (a) => a.email === email && a.password === password
            );

            if (!account) {
                setError("Invalid email or password!");
                return;
            }

            if (account.status !== "Active") {
                setError("Your account is not active!");
                return;
            }

            if (account) {
                localStorage.setItem("user", JSON.stringify(account));
                navigate("/sysllabus");
            } else {
                setError("Invalid account");
            }

        } catch (error) {
            setError("Cannot connect to server!");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">

            <Card style={{ width: "400px" }} className="mt-5">
                <Card.Body>

                    <h2 className="text-center mb-4">Login</h2>

                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleLogin}>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="Email of student of lecture"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                        >
                            Login
                        </Button>

                    </Form>

                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
