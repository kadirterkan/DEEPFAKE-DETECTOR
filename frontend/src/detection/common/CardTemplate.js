import React from 'react';
import {Card, CardGroup, Row, Form, Button} from "react-bootstrap";
import { Pie } from 'react-chartjs-2';

class CardTemplate extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card 
            bg={this.props.bg === undefined ? 'dark' : this.props.bg} 
            text={this.props.bg === undefined ? 'light' : 'dark'} 
            border={this.props.bg === undefined ? 'dark' : 'secondary'}
            style={{width: this.props.width}} 
            className={"text-center" + (this.props.class === undefined ? "" : this.props.class)}
            >
                <Card.Header as={this.props.header}>{this.props.headerText}</Card.Header>
                <Card.Body>
                    {this.props.body}
                </Card.Body>
                {this.props.footer === undefined ? null : 
                <Card.Footer>
                    {this.props.footer}
                </Card.Footer>}
            </Card>
        );
    }
}

class ResultCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const Body = () => {
            return(
                <Pie data={this.props.data}/>
            ); 
        }

        return (
            <CardTemplate class=" mx-2 mb-2" bg='secondary' width='20rem' header="h6" headerText="Result" body={<Body/>}/>
        );
    }
}

class VideoInfoCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const Body = () => {
            return (
                <>
                    <Row>
                        <h6>Video Duration : {this.props.duration + " seconds"}</h6>
                    </Row>
                    <br/>
                    <Row>
                        <h6>Video Resolution : {this.props.width + "x" + this.props.height + " pixels"}</h6>
                    </Row>
                </>
            );
        }

        return (
            <>
                <CardTemplate class=" mx-2 mb-2" bg='secondary' width='30rem' header="h6" headerText="Video Information" body={<Body/>}/>
            </>
        );
    }
}

export class UploadCard extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        const Body = () => {

            return (
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Please upload the video you want to check.</Form.Label>
                    <Form.Control type="file" onChange={this.props.handleVideoUpload}/>
                </Form.Group>
            );
        }

        const Footer = () => {
            return (
                <Button variant="secondary" onClick={this.props.handleClick}>Submit</Button>
            );
        }

        return (
            <CardTemplate class=" my-5" width='30rem' header="h5" headerText="Upload" body={<Body/>} footer={<Footer/>}/>
        );
    }
}

export class VideoCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const Body = () => {

            return (
                <video height={this.props.height} width={this.props.width} controls>
                    <source src={this.props.videoLocation} type="video/webm"></source>
                </video>
            );
        }

        return (
            <CardTemplate class=" mx-2 mb-2 mt-2" bg='secondary' width='50rem' header="h5" headerText="Video" body={<Body/>}/>
        );
    }
}

export class ResponseCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const Body = () => {
            return (
                <>
                    <Row className='d-flex justify-content-center'>
                        <CardGroup>
                            <ResultCard data={this.props.data}/>
                            <VideoInfoCard duration={this.props.state['duration']} width={this.props.state['width']} height={this.props.state['height']}/>
                        </CardGroup>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <CardGroup>
                            <VideoCard videoLocation={this.props.videoLocation} height={this.props.state['height']} width={this.props.state['width']}/>
                        </CardGroup>
                    </Row>
                </>
                
            );
        }

        return (
            <CardTemplate class=" my-5" width='50rem' header="h5" headerText="Information" body={<Body/>}/>
        );
    }
}