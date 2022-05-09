import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Response from './Response';

ChartJS.register(ArcElement, Tooltip, Legend);

export const labels = ['Fake', 'Real'];
export const backgroundColor = ['rgba(255,0,0,1)', 'rgba(0,128,0,1)'];

function Result() {

    const [data, setData] = useState(null);
    const [videoLocation, setVideoLocation] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();

    const state = useLocation();

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

    useEffect(() => {
        if (error !== undefined) {
            toast.error(error);
        }
    }, [error]);

    return (
        <>
            {(data && loaded ) && <Response data={data} state={state} videoLocation={videoLocation}/>}
        </>
    );
}

export default Result;