import React , {useState} from "react";
import { Card, Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import "./cardItem.css";

const CardItem = ({ title, text, img, githubLink}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  } 
  return (
    <div className="card-item"
      style={{
        backgroundImage: `url('https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?t=st=1725975691~exp=1725979291~hmac=5bb9d0e3d958822eda5e55387da8ae629b5ff633b92c297a20a922375800634f&w=996')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <Card style={{ backgroundColor: "transparent", border: "none" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body className="text-color">
          <Card.Title className="text-white" >{title}</Card.Title>
          <Card.Text className="text-white card-text">
            {isExpanded
              ? text
              : text.slice(0, 50) + (text.length > 50 ? "..." : "")}
          </Card.Text>
          {text.length > 50 && (
            <Button className="text-decoration-none mb-4 efect-buton bg-transparent"variant="link" onClick={toggleText}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </Button>
          )}
          <Button className="efect-buton bg-transparent"variant="light" href = {githubLink} target="_blank">
            <FaGithub /> GitHub
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItem;
