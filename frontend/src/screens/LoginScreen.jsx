import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../store/slices/usersApiSlice.js";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation(); //destructuring the login function from the useLoginMutation hook and also the isLoading boolean
  const { userInfo } = useSelector((state) => state.auth); //destructuring the userInfo from the auth slice, userInfo is a part of the state so we use useSelector

  //while clicking of proceed to checkout, if the user is already logged in then redirect to shipping page, for that we use useLocation hook:
  const { search } = useLocation(); //destructuring the search from the useLocation hook
  const sp = new URLSearchParams(search); //creating a new URLSearchParams object and passing the search as an argument
  const redirect = sp.get("redirect") || "/"; //getting the redirect param from the URLSearchParams object

  useEffect(() => {
    if (userInfo) {
      //if there is userInfo in local storage then navigate to whatever the redirect is
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap(); //unwrap the promise returned by the login function
      dispatch(setCredentials({ ...res })); //dispatch the setCredentials action with the response as the payload
      navigate(redirect); //navigate to whatever the redirect is
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <p>Loading...</p>}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
