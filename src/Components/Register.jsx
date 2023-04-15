import "./css/Register.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const Register = () => {
  return (
    <>
      <div>판매뚝딱 회원가입폼</div>
      <div className="registerForm">
        <InputGroup className="mb-3">
          <FloatingLabel controlId="id" label="Id">
            <Form.Control type="text" placeholder="id" />
          </FloatingLabel>
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="checkPW"
          label="Check Password"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel controlId="email" label="Email address" className="mb-3">
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="name" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="name" />
        </FloatingLabel>
      </div>
    </>
  );
};

export default Register;
