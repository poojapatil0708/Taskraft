import {useDispatch} from 'react-redux'
import {removeUser } from '../redux/user-reducer';

const Home = () => {

    const dispatch = useDispatch()

    return(
        <div>
            <h2>Home</h2>
            <button onClick={() => dispatch(removeUser({email:' asdasdsd'}))} className="btn btn-primary" >LogOut</button>
        </div>
    );
}

export default Home;