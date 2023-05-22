import { useDispatch, useSelector } from "react-redux";
import { AddIcon, PowerButtonIcon } from "../components/icons";
import { removeUser } from "../redux/user-reducer";
import Task from "../components/task";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../constants";

const DisplayTask = () => {

    const [task, setTasks] = useState([]);
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();


    useEffect(() => {
        const APIURL = constants.base_url_production;
        axios({ method: 'GET', url: `${APIURL}/tasks`, headers: { Authorization: `Bearer ${token}` } })
            .then(response => setTasks(response.data))
            .catch(err => toast.error('Error to get task'))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div style={{ position: 'absolute', right: 20, top: 20 }}>
                <PowerButtonIcon onClick={() => dispatch(removeUser())} />
            </div>
            <div className='d-flex flex-column align-items-center mt-4 '>
                <h3>Your Tasks</h3>
                {task.map((item, index) => <Task key={index} task={item} onDelete={() => setTasks(task.filter((innrItem, innrIndex) => innrIndex !== index))} />)}
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }} onClick={() => navigate('/create-task')} >
                <AddIcon />
            </div>
        </div>
    );
}

export default DisplayTask;