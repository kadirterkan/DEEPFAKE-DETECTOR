import {Card, Col, Row} from "react-bootstrap";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const labels = ['Fake', 'Real'];
export const backgroundColor = ['rgba(255,0,0,1)', 'rgba(0,128,0,1)'];

function Result() {

    var data = {
        labels: labels,
        datasets: [
            {
                data: [80, 20],
                backgroundColor: backgroundColor
            }
        ]
    };

    var resultFromServer = {
        rate: "%90 Fake",
        message: "Your video is fake",
        name: "test.mp4",
        resolution: "1280x720",
        length: 120
    };

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Card style={{width: '50rem'}}>
                <Card.Header as="h5">Result</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            Result:<Doughnut data={data}/>
                        </Col>
                        <Col>
                            {resultFromServer.message}
                        </Col>
                    </Row>
                </Card.Body>
                {resultFromServer && <div>
                    <Card.Header as="h5">Video Info</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                Name: {resultFromServer.name}
                            </Col>
                            <Col>
                                Length: {resultFromServer.length} seconds
                            </Col>
                            <Col>
                                Resolution: {resultFromServer.resolution}
                            </Col>
                        </Row>
                    </Card.Body>
                </div>}
            </Card>
        </div>
    );
}

export default Result;