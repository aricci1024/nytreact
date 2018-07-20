import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";

const ListItem = ({ _id, handleSaveButton, title, date, url }) => (
    <li>
        <Container>
            <Row style={{marginTop: 40}}>
                <Col size="xs-8 sm-9">
                    <h3>{ title }</h3>
                    <p>Published on { date }</p>
                    <a rel="noreferrer noopener" target="_blank" href={ url }>
                        <button className="btn btn-primary">See full article</button>
                    </a>
                    <button id = { _id } className = "btn btn-primary save-btn" onClick = {() => handleSaveButton(_id)} > Save Article </button>
                </Col>
            </Row>
        </Container>
    </li>
);

export default ListItem;