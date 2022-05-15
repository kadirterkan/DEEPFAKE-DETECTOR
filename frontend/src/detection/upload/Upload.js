import {useState} from "react";
import DetectionRemoteService from "../common/DetectionRemoteService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {CardTemplate} from '../common/CardTemplate';
import {Form, Button, Spinner} from "react-bootstrap";

function Upload() {
    
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVideoUpload = (event) => {

        const fileType = event.target.files[0].type;
        if (fileType.split('/')[0] === "video") {
            setVideo(event.target.files[0]);
        } else {
            toast.error("Please upload a video file");
        }
    };

    const successFunction = (result) => {
        navigate('/result', {state : result.data});
    };

    const finalFunction = () => {
        setLoading(false);
    };

    const handleClick = () => {
        setLoading(true);
        let detect = new DetectionRemoteService();
        if (video !== undefined && video !== null) {
            detect.getResultByVideo(video, successFunction, finalFunction);
        } else {
            toast.error("Please upload a video file");
        }
    };

    const UploadBody = () => {
        return (
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Please upload the video you want to check.</Form.Label>
                <Form.Control type="file" onChange={handleVideoUpload}/>
            </Form.Group>
        );
    }

    const UploadFooter = () => {
        return (
            <Button variant="secondary" onClick={handleClick} disabled={loading}>{loading ? <><Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />...Loading</>: "Submit"}</Button>
        );
    }

    return (
        <div className="d-flex mt-5 justify-content-center align-items-center">
            <CardTemplate class=" my-5" width='30rem' header="h5" headerText="Upload" body={<Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Please upload the video you want to check.</Form.Label>
                <Form.Control type="file" onChange={handleVideoUpload}/>
            </Form.Group>} footer={<Button variant="secondary" onClick={handleClick} disabled={loading}>{loading ? <><Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />...Loading</>: "Submit"}</Button>}/>
        </div>
    );
};

export default Upload;