const Notification = ({message, type}) => {
    if (message === null) return null;

    const style = type === 'info' ? 'info' : 'error'

    return (
        <div className={style}>
            {message}
        </div>
    );
}

export default Notification;