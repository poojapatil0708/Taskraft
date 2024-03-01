import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import constants from "../constants";
import { useState } from "react";
import Loader from "./loader";

const Task = ({ task, onDelete }) => {

    const { token } = useSelector(state => state.user);
    const [isLoading, setIsLoding] = useState(false)
    const navigate = useNavigate();

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

    return (
        <div className='card d-flex flex-row mb-2 mt-2 col-sm-12 col-md-6 p-2 justify-content-between' >
            <div className='d-flex flex-column'>
                <span className="text-black">{task.title}</span>
                <span className="text-black">{task.description}</span>
            </div>
            <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} >
                <div onClick={() => navigate('/update-task', { state: task })} >
                    <EditIcon />
                </div>
                {
                    !isLoading
                        ?
                        <div onClick={deleteTask}>
                            <DeleteIcon />
                        </div>
                        :
                        <Loader dontShowMsg />
                }
            </div>
        </div>
    );
}

export default Task;