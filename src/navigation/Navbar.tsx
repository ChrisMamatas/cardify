import { Link} from "react-router-dom";
import {MdSettings} from "react-icons/md"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css"

export default function CustomNavbar() {

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Link to={"/"} className={"link"}>
                    <Navbar.Brand href="#home">Cardify</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className={"justify-content-end"}>
                    <Nav>
                        <NavDropdown
                            title={<MdSettings style={{height: 20, width: 20}}/>}
                            menuVariant="dark"
                            className={"dropdown-menu-start" }
                            align={"end"}
                        >
                            <NavDropdown.Item>
                                Update Info
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}