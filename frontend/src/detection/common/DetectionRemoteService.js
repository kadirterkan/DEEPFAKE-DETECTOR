import axios from "axios";
import BaseRemoteService from "../../common/infra/remoteservice/BaseRemoteService";

class DetectionRemoteService extends BaseRemoteService {

    getResultByVideo(video, successFunction) {
        let formData = new FormData();
        formData.append('video', video);
        axios.post(`http://127.0.0.1:8000/api/detector`, formData)
            .then(result => successFunction(result))
            .catch(reason => this.catchResponseFromServerToaster(reason));
    }

    getVideoById(successFunction) {
        let formData = new FormData();
        formData.append('key', 2);
        axios.post(`http://127.0.0.1:8000/api/video`, formData)
            .then(result => successFunction(result));
            //.catch(reason => this.catchResponseFromServerToaster(reason));
    }
}

export default DetectionRemoteService;