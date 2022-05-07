import {Card, Col, Row} from "react-bootstrap";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const labels = ['Fake', 'Real'];
export const backgroundColor = ['rgba(255,0,0,1)', 'rgba(0,128,0,1)'];

function Result() {

    const [data, setData] = useState(null);
    const [videoLocation, setVideoLocation] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();

    const {state} = useLocation();

    useEffect(() => {
        console.log(data);
        const fetchImage = async () => {
            try {
                const response = await import(`../../assets/video/${state['video_id']}.webm`);
                setVideoLocation(response.default);
            } catch (err) {
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

    return (
        <div>
            {(data && loaded ) &&
                <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <Card style={{width: '50rem'}}>
                    <Card.Header as="h5">Result</Card.Header>
                    <Card.Body>
                        <div className="justify-content-center align-items-center">
                            <Col>
                                <div style={{width: '15rem'}}>
                                    <Pie data={data}/>
                                </div>
                            </Col>
                        </div>
                    </Card.Body>
                    <div>
                        <Card.Header as="h5">Video Info</Card.Header>
                        <Card.Body>
                            <Row>
                                <video height={state['width']} width={state['height']} controls>
                                    <source src={videoLocation} type="video/webm"></source>
                                </video>
                            </Row>
                            <Row>
                                <Col>
                                    Length: {state['duration']} seconds
                                </Col>
                                <Col>
                                    Resolution: {state['width'] + "x" + state['height']}
                                </Col>
                            </Row>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        }
        </div>
    );
}

export default Result;