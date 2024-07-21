import useMessage from "../hooks/useMessage";

const Message = ({
    stage,
    turn,
    pileInitialized,
    windowSize
}) => {

    const [message, updateMessage] = useMessage(stage, turn, pileInitialized);
    const cardHeight = 100;
    const windowHeight = windowSize.height;
    const margin = cardHeight + windowHeight/4;

    return(
        <div className="message" style={{ position: 'relative' }}>
            {message && (
                <div className="message-text" 
                    style={{
                        textAlign: 'center',
                        margin: '10px auto',
                        padding: '10px',
                        borderRadius: '2px',
                        backgroundColor: 'yellow',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        position: 'absolute',
                        top: `${windowHeight-margin}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        zIndex: -10000
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    )
}

export default Message;
