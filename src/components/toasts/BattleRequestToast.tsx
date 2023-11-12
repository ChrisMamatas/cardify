import { Toast, Button } from 'react-bootstrap';
import "./BattleRequestToast.css"

interface BattleRequestToastProps {
    show: boolean;
    onClose: () => void;
    onAccept: () => void;
    onDecline: () => void;
    message: string;
}

const BattleRequestToast: React.FC<BattleRequestToastProps> = ({ show, onClose, onAccept, onDecline, message }) => (
    <div className='toast-container'>
        <Toast show={show} onClose={onClose} delay={30000} autohide={false}>
            <Toast.Header>
                <strong className="mr-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>
                {message}
                <div className="mt-2">
                    <Button size="sm" variant="success" onClick={onAccept}>Accept</Button>
                    <Button size="sm" variant="danger" className="ml-2" onClick={onDecline}>Decline</Button>
                </div>
            </Toast.Body>
        </Toast>
    </div>
)


export default BattleRequestToast;