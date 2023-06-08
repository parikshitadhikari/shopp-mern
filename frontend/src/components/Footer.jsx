import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear(); //get current year
  return (
    <footer>
      <Container>
        <Row>
          <Col className="py-3 text-center">
            <p>Shopp &copy; {currentYear} </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
