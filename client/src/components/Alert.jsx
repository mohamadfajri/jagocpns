import { Alert } from 'flowbite-react';
import { useAlert } from '../stores/useAlert';

const AlertNotif = () => {
  const { alert, status, setStatus } = useAlert();
  return (
    <div
      className={`fixed top-4 right-4 z-50 ${status === true ? '' : 'hidden'}`}
    >
      <Alert color={alert.color} onDismiss={() => setStatus(false)}>
        <span className='font-medium'>{alert.title} </span>
        {alert.message}
      </Alert>
    </div>
  );
};

export default AlertNotif;
