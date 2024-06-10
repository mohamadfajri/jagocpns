import QuestionerTable from './QuestionerTable';

const QuestionerDashboard = () => {
  return (
    <main className='min-h-screen py-4'>
      <h1 className='m-8 text-2xl font-semibold'>List of Tryout</h1>
      <QuestionerTable />
    </main>
  );
};

export default QuestionerDashboard;
