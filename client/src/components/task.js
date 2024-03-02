import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import constants from "../constants";
import { useState } from "react";
import Loader from "./loader";
import Input from "./input";

const Task = ({ item, onDelete }) => {

    const { token } = useSelector(state => state.user);
    const [isLoading, setIsLoding] = useState(false)
    const navigate = useNavigate();
    const [isEditTask, setIsEditTask] = useState({ title: false, discription: false });
    const [task, setTask] = useState(item);
    console.log(task)

    const deleteTask = () => {
        setIsLoding(true)
        const APIURL = constants.base_url_local;
        axios({ method: 'delete', url: `${APIURL}/task/${task._id}`, headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setIsLoding(false);
                onDelete()
                toast.success('Taks Deleted!')
            })
            .catch(err => {
                setIsLoding(false);
                toast.error(err.response?.data?.message || 'Error deleting task')
            })
    }

    const updateTask = () => {
        setIsEditTask(false);
        const APIURL = constants.base_url_local;
        axios({ method: 'put', url: `${APIURL}/task/${task._id}`, data: task, headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response.data)
                setTask(response.data)
            })
            .catch(err => console.log(err))
    }

    return task ?
        (
            <div className='card d-flex flex-row mb-2 mt-2 col-sm-12 col-md-6 p-2 justify-content-between' >
                <div className='d-flex flex-column'>
                    {
                        !isEditTask.title ?
                            <span onClick={() => setIsEditTask({...isEditTask, title: true})} className="text-black p-2">{task.title}</span>
                            :
                            <Input autoFocus type="text" value={task.title} onChange={(val) => setTask({ ...task, title: val })} onBlur={() => updateTask()} />
                    }
                    {
                        !isEditTask.discription ?
                            <span onClick={() => setIsEditTask({...isEditTask, discription: true})} className="text-black p-2">{task.description}</span>
                            :
                            <Input autoFocus type="text" value={task.description} onChange={(val) => setTask({ ...task, discription: val })} onBlur={() => updateTask()} />
                    }
                </div>
                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} >
                    <div onClick={() => navigate('/update-task', { state: task })} >
                        <EditIcon />
                    </div>
                    {
                        !isLoading
                            ?
                            <div onClick={() => deleteTask()}>
                                <DeleteIcon />
                            </div>
                            :
                            <Loader dontShowMsg />
                    }
                </div>
            </div>
        )
        :
        null;
}

export default Task;