import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/actions/authActions";
import Notification from "../../components/notification/Notification";
const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification.notification);

  const [validPassword, setValidPassword] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatePassword = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };
  const onRegister = async (e) => {
    e.preventDefault();

    validatePassword();
    if (validPassword) {
      dispatch(registerUser(user));
    }
  };
  useEffect(() => {
    console.log(notification?.type);
    if (notification?.type == "success") {
      navigate("/login");
    }
  }, [notification, navigate]);
  return (
    <div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Timeline</h2>
                  <div className="mb-3">
                    <Form onSubmit={onRegister}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicUsername"
                      >
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          required
                          placeholder="Enter email"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicConfirmPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          name="ConfirmPassword"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <p
                        style={{
                          color: "red",
                          display: validPassword ? "none" : "block",
                        }}
                      >
                        Passwords Don't Match
                      </p>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?
                        <Link className="text-primary fw-bold" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
