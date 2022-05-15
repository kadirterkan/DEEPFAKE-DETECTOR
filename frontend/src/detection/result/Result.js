import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {CardTemplate} from '../common/CardTemplate';
import { toast } from "react-toastify";
import {CardGroup, Row} from "react-bootstrap";
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const labels = ['Fake', 'Real'];
export const backgroundColor = ['rgba(255,0,0,1)', 'rgba(0,128,0,1)'];

function Result() {

    const [data, setData] = useState(null);

    var state = useLocation();
    state = state['state'];
    
    const [videoLocation, setVideoLocation] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error !== undefined) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../../assets/video/${state['video_id']}.webm`);
                setVideoLocation(response.default);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoaded(true);
            }
        }
        fetchImage();
    }, [videoLocation]);

    useEffect(() => {
        setData({
            labels: labels,
            datasets: [
                {
                    data: [state['probs'], 1 - state['probs']],
                    backgroundColor: backgroundColor
                }
            ],
            scale:0.5
        });
    }, []);

    const ResultBody = () => {
        return(
            <>
                <Pie data={data}/>
            </>
        ); 
    }

    const VideoInfoBody = () => {
        return (
            <>
                <Row>
                    <h6>Video Duration : {state['duration'] + " seconds"}</h6>
                </Row>
                <br/>
                <Row>
                    <h6>Video Resolution : {state['width'] + "x" + state['height'] + " pixels"}</h6>
                </Row>
                <br/>
                <Row>
                    <h6>Video Prediction : {state['prediction'] === "True" ? "DEEPFAKE DETECTED" : "NO DEEPFAKE DETECTED"}</h6>
                </Row>
            </>
        );
    }

    const VideoBody = () => {

        return (
            <>
            {loaded && 
                <video height={300} width={400} controls>
                    <source src={videoLocation} type="video/webm"></source>
                </video>
            }
            </>
        );
    }

    const ResponseBody = () => {
        return (
            <>
                <Row className='d-flex justify-content-center'>
                    <CardGroup>
                        <CardTemplate class=" mx-2 mb-2" bg='secondary' width='20rem' header="h6" headerText="Result" body={<ResultBody/>}/>
                        <CardTemplate class=" mx-2 mb-2" bg='secondary' width='30rem' header="h6" headerText="Video Information" body={<VideoInfoBody/>} />
                    </CardGroup>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <CardGroup>
                        <CardTemplate class=" mx-2 mb-2 mt-2" bg='secondary' width='50rem' header="h5" headerText="Video" body={<VideoBody/>}/>
                    </CardGroup>
                </Row>
            </>
        );
    }

    return (
        <>
            {(data && loaded) && 
            <div className='d-flex justify-content-center'>
                <CardTemplate class=" my-5" width='50rem' header="h5" headerText="Information" body={<ResponseBody/>}/>
            </div>}
        </>
    );
}

export default Result;