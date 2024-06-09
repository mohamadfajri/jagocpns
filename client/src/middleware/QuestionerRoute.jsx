import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuestioner } from '../stores/useQuestioner';

// eslint-disable-next-line react/prop-types
const QuestionerRoute = ({ children }) => {
  const { token, expired } = useQuestioner();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token && expired) {
        const currentTime = new Date().getTime();
        if (currentTime > expired) {
          navigate('questioner/auth/signin');
        }
      }
    };

    checkTokenExpiration();
  }, [token, expired, navigate]);

  if (!token) {
    return <Navigate to='questioner/auth/signin' />;
  }
  console.log({ token, expired });
  return children;
};

export default QuestionerRoute;
