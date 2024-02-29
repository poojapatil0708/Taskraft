const Loader = ({dontShowMsg}) => {
    return (
        <div className="d-flex justify-content-center flex-column align-items-center">
            <div className="spinner-border text-primary" role="status" />
            {dontShowMsg ? null : <div>Please be patient. We are using free server</div>}
        </div>
    );
}

export default Loader;