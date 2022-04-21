import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import DetectionRemoteService from "../common/DetectionRemoteService";
import { useNavigate } from "react-router-dom";

function Upload() {

    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleVideoUpload = (event) => {
        setVideo(event.target.files[0]);
    };

    const successFunction = (result) => {
        console.log(result);
        navigate('/result', {state : result.data});
    };

    const handleClick = () => {
        let detect = new DetectionRemoteService();
        if (video !== undefined && video !== null) {
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