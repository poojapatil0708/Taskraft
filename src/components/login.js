import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user-reducer";

const LogIn = () => {

    let demoResponse ={
        user: {
            email: 'demo'
        },
        token: 'hgfhgfhg'
    }

    const [userDetails, setUserDetailes] = useState({email:'', password:''})
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(addUser(demoResponse.user))
    }

    return (
        <div className="m-5 d-flex flex-column align-items-center justify-content-center">
            <h3>Login</h3>
            <input type='text' className="form-control mb-3" placeholder="Enter your email" onChange={ e => setUserDetailes({...userDetails,email:e.target.value})} value={userDetails.email}/>
            <input type='password' className="form-control mb-3" placeholder="Enter your password" onChange={e => setUserDetailes({...userDetails, password: e.target.value})} value={userDetails.password} />
            <button className="btn btn-primary" onClick={onSubmit}>Login</button>

        </div>
    );
}

export default LogIn;