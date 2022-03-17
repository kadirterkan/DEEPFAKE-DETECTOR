import axios from "axios";
import BaseRemoteService from "../../common/infra/remoteservice/BaseRemoteService";

class DetectionRemoteService extends BaseRemoteService {

    // getResultByImage(image, successFunction) {
    //     axios.post(`http://localhost:8080//detector/detectImage`, {image})
    //         .then(reason => successFunction(reason))
    //         .catch(reason => this.catchResponseFromServerToaster(reason));
    // }

    getResultByVideo(video, successFunction) {
        const formData = new FormData();
        formData.append("video", video);
        axios.post(`http://localhost:8080//detector/detectVideo`, {formData}, {headers: { "Content-Type": "multipart/form-data" }})
            .then(result => successFunction(result))
            .catch(reason => this.catchResponseFromServerToaster(reason));
    }
}

export default DetectionRemoteService;