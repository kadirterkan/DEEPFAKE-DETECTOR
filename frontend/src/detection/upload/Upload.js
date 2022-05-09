import {useState} from "react";
import DetectionRemoteService from "../common/DetectionRemoteService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {UploadCard} from '../common/CardTemplate';

function Upload() {
    
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    const handleVideoUpload = (event) => {
        console.log(event.target.files[0]);

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

    const handleClick = () => {
        let detect = new DetectionRemoteService();
        if (video !== undefined && video !== null) {
            console.log("Entered");
            detect.getResultByVideo(video, successFunction);
        } else {
            toast.error("Please upload a video file");
        }
    };

    return (
        <div className="d-flex mt-5 justify-content-center align-items-center">
            <UploadCard handleVideoUpload={handleVideoUpload} handleClick={handleClick}/>
        </div>
    );
};

export default Upload;