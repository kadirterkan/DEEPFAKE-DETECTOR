import {ResponseCard} from '../common/CardTemplate';

function Response(props) {

    return (
        <div className='d-flex justify-content-center'>
            <ResponseCard data={props.data} state={props.state} videoLocation={props.videoLocation}/>
        </div>
    );
}

export default Response;