import "./header.css";
import img from "../../assets/logo.jpg";
import Container from "../Container/container";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <div className="content">
          <h1>DASHBOARD</h1>
          <div className="admin">
            <p>SAFAA</p>
            <img src={img} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
