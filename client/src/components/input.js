const Input = ({ type, placeholder, label, id, name, error, onChange, value }) => {
    return (
        <div className="d-flex flex-column align-items-start mt-2">
            <label>{label}</label>
            <input value={value} onChange={(e) => onChange(e.target.value)} id={id} name={name} type={type} placeholder={placeholder} className="form-control mb-3 mt-1 border-light shadow-sm p-2 bg-body-tertiary rounded" />
            {error ? <div className="mb-2" style={{color: 'red'}}>{error}</div> : null}
        </div>
    );
}

export default Input;