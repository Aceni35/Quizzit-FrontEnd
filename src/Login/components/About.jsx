import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function About({ text, name, src }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default About;
