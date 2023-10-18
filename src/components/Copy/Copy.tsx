const CopyNotification = ({ message, isVisible }: { message: string, isVisible: boolean }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: '4',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 1)',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                display: isVisible ? 'block' : 'none',
                fontFamily: 'CeraRoundPro-Medium',
                fontSize: '14px',
            }}
        >
            {message}
        </div>
    );
};

export default CopyNotification;