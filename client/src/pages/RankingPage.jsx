import Choosen from '../components/app/Ranking/Choosen';
import Unchoosen from '../components/app/Ranking/Unchoosen';
import { useRank } from '../stores/useRank';

const RankingPage = () => {
  const { active } = useRank();
  return (
    <div className='sm:p-10 sm:ml-64 dark:bg-black min-h-screen'>
      {!active && <Unchoosen />}
      {active && <Choosen />}
    </div>
  );
};

export default RankingPage;
