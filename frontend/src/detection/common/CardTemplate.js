import React from 'react';
import {Card} from "react-bootstrap";

export class CardTemplate extends React.Component {
    
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