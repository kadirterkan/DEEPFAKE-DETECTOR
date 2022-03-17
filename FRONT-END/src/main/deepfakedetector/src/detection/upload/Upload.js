import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import DetectionRemoteService from "../common/DetectionRemoteService";

function Upload() {

    const [video, setVideo] = useState(null);

    const handleVideoUpload = (file) => {
        setVideo(file);
    };

    const successFunction = (result) => {
        console.log(result);
    };

    const handleClick = () => {
        let detect = new DetectionRemoteService();
        if (video !== undefined && video !== null) {
            console.log(video);
            detect.getResultByVideo(video, successFunction);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card>
                <Card.Header>Upload</Card.Header>
                <Card.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Please upload the file you want to check.</Form.Label>
                        <Form.Control type="file" onChange={handleVideoUpload}/>
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleClick}>Submit</Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Upload;