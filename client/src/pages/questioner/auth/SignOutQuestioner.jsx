import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestioner } from '../../../stores/useQuestioner';

const SignOutQuestioner = () => {
  const { removeToken } = useQuestioner();
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate('/questioner/auth/signin');
  }, [removeToken, navigate]);

  return null;
};

export default SignOutQuestioner;
