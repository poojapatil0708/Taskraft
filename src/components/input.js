const Input = ({ type, placeholder, label, id, name, error, onChange }) => {
    return (
        <div className="d-flex flex-column align-items-start mt-2">
            <label>{label}</label>
            <input onChange={(e) => onChange(e.target.value)} id={id} name={name} type={type} placeholder={placeholder} className="form-control mb-3 mt-2" />
            {error ? <div className="mb-2" style={{color: 'red'}}>{error}</div> : null}
        </div>
    );
}

export default Input;