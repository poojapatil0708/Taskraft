import { useSelector } from "react-redux";
import { AddIcon } from "../components/icons";
import Task from "../components/task";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../constants";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import { Image } from "@chakra-ui/react";
import noTask from "../assets/noTask.png";

const DisplayTask = () => {

    const [task, setTasks] = useState([]);
    const [isLoading, setIsLoding] = useState(false)
    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoding(true)
        const APIURL = constants.base_url_local;
        axios({ method: 'GET', url: `${APIURL}/tasks`, headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setIsLoding(false)
                setTasks(response.data)
            })
            .catch(err => {
                setIsLoding(false)
                toast.error('Error to get task')
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column align-items-center mt-4 '>
                <h2 className="mb-3" >Add Your Tasks</h2>
                {!isLoading && !task.length ?
                    <div className="d-flex align-items-center justify-content-center flex-column" >
                        <b>No any task added</b>
                        <Image boxSize='40%' src={noTask} alt='No Task' />
                    </div> : null}
                {!isLoading
                    ? task.map((item, index) =>
                        <Task key={index} item={item} onDelete={() => setTasks(task.filter((innrItem, innrIndex) => innrIndex !== index))} />)
                    :
                    <Loader />}
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }} onClick={() => navigate('/create-task')} >
                <AddIcon />
            </div>
        </div>
    );
}

export default DisplayTask;