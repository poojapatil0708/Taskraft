import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon } from "./icons";
import { useNavigate } from "react-router-dom";

const Task = ({ task, onDelete }) => {

    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();

    const deleteTask = () => {
        const APIURL = 'http://localhost:8000';
        axios({ method: 'delete', url: `${APIURL}/task/${task._id}`, headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                onDelete()
                toast.success('Taks Deleted!')
            })
            .catch(err => toast.error(err.response?.data?.message || 'Error deleting task'))
    }

    return (
        <div className='card d-flex flex-row mb-2 mt-2 col-sm-12 col-md-6 p-2 justify-content-between' >
            <div className='d-flex flex-column'>
                <span>{task.title}</span>
                <span>{task.description}</span>
            </div>
            <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} >
                <EditIcon onClick={() => navigate('/update-task', {state: task})} />
                <DeleteIcon onClick={deleteTask} />
            </div>
        </div>
    );
}

export default Task;