import { Alert } from 'flowbite-react';
import { useAlert } from '../stores/useAlert';

const AlertNotif = () => {
  const { alert, setAlert } = useAlert();
  return (
    <div className={`fixed top-4 right-4 z-50 ${alert.title ? '' : 'hidden'}`}>
      <Alert color={alert.color} onDismiss={() => setAlert({ title: null })}>
        <span className='font-medium'>{alert.title} </span>
        {alert.message}
      </Alert>
    </div>
  );
};

export default AlertNotif;
