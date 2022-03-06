import {Button, Card, Form} from "react-bootstrap";

function Upload() {
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card>
                <Card.Header>Upload</Card.Header>
                <Card.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Please upload the file you want to check.</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary">Submit</Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Upload;