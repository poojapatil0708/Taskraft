import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import constants from "../constants";
import { useState } from "react";
import Loader from "./loader";
import Input from "./input";
import { FaTrashAlt } from "react-icons/fa";

const Task = ({ item, onDelete }) => {

    const { token, user } = useSelector(state => state.user);
    const [isLoading, setIsLoding] = useState(false)
    const [isEditTask, setIsEditTask] = useState({ title: item._id ? false : true, description: item._id ? false : true });
    const [task, setTask] = useState(item);

    const deleteTask = () => {
        if (!item._id) {
            onDelete()
        } else {
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
    }

    const manageTask = () => {
        if (task._id) {
            setIsEditTask(false);
            const APIURL = constants.base_url_local;
            axios({ method: 'put', url: `${APIURL}/task/${task._id}`, data: task, headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data)
                    setTask(response.data)
                })
                .catch(err => console.log(err))
        } else if (task.title && task.description) {
            setIsLoding(true);
            let data = {
                title: task.title,
                description: task.description,
                user: user._id,
                status: "pending"
            }
            const APIURL = constants.base_url_local;
            axios({ method: 'POST', url: `${APIURL}/task`, data, headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setIsLoding(false)
                setIsEditTask(false);
                    toast.success('Task added')
                })
                .catch(err => {
                    setIsLoding(false);
                    toast.error('Error adding task')
                })
        }
    }

    return task ?
        (
            <div className='card d-flex flex-row mb-2 mt-2 p-2 justify-content-between' >
                <div className='d-flex flex-column'>
                    {
                        !isEditTask.title ?
                            <span onClick={() => setIsEditTask({ ...isEditTask, title: true })} className="text-black p-2 fw-semibold">{task.title}</span>
                            :
                            <Input onBlur={manageTask} autoFocus type="text" value={task.title} onChange={(val) => setTask({ ...task, title: val })} />
                    }
                    {
                        !isEditTask.description ?
                            <span onClick={() => setIsEditTask({ ...isEditTask, description: true })} className="text-black p-2">{task.description}</span>
                            :
                            <Input onBlur={manageTask} type="text" value={task.description} onChange={(val) => setTask({ ...task, description: val })} />
                    }
                </div>
                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} >
                    {
                        !isLoading
                            ?
                            <div onClick={() => deleteTask()}>
                                <FaTrashAlt size="20px" color="red" />
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