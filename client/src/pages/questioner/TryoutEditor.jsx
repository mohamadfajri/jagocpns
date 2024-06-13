import { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  FileInput,
  Textarea,
  TextInput,
} from 'flowbite-react';

const TryoutEditor = () => {
  const [tryout, setTryout] = useState({
    number: '',
    type: '',
    question: '',
    explanation: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    scoreA: 0,
    scoreB: 0,
    scoreC: 0,
    scoreD: 0,
    scoreE: 0,
  });

  const [numbers, setNumbers] = useState([1]);
  const [activeNumber, setActiveNumber] = useState(1);
  const [isSave, setIsSave] = useState(false);

  const handleType = (newType) => () => {
    setTryout((prevState) => ({
      ...prevState,
      type: newType,
    }));
  };

  useEffect(() => {
    const originalTryout = {
      type: '',
      question: '',
      explanation: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      scoreA: 0,
      scoreB: 0,
      scoreC: 0,
      scoreD: 0,
      scoreE: 0,
    };

    const hasChanged = Object.keys(originalTryout).some(
      (key) => tryout[key] !== originalTryout[key]
    );

    setIsSave(hasChanged);
  }, [tryout]);

  useEffect(() => {
    setTryout((prevState) => ({
      ...prevState,
      number: activeNumber,
    }));
  }, [activeNumber]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTryout((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClear = () => {
    setTryout({
      number: '',
      type: '',
      question: '',
      explanation: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      scoreA: 0,
      scoreB: 0,
      scoreC: 0,
      scoreD: 0,
      scoreE: 0,
    });
  };

  const handleSave = () => {
    console.log(tryout);
  };

  const handleSaveAndNext = () => {
    handleSave();
    setActiveNumber((prev) => {
      const newNumber = prev + 1;
      setNumbers([...numbers, newNumber]);
      return newNumber;
    });
    handleClear();
  };

  return (
    <div className='flex'>
      <div className='w-1/5 bg-white border-r border-gray-300'>
        <div className='fixed top-0 left-0 right-0 bg-white z-10'>
          <header className='flex justify-between border-b border-black h-20'>
            <h1 className='text-2xl m-2 md:m-6 font-medium'>Tryout Editor</h1>
          </header>
        </div>
        <div className='flex flex-col mt-20'>
          <div className='w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
            {numbers.map((number) => (
              <button
                key={number}
                className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                  activeNumber === number ? 'bg-gray-600 text-white' : ''
                }`}
                onClick={() => setActiveNumber(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='w-4/5 py-24 px-8'>
        <h1 className='text-xl font-medium my-4'>Soal Nomer {activeNumber}</h1>
        <form className='flex max-w-md flex-col gap-4'>
          <div>
            <Dropdown
              label={tryout.type ? tryout.type : 'Tipe Soal'}
              color={'success'}
              dismissOnClick={true}
            >
              <Dropdown.Item onClick={handleType('TIU')}>TIU</Dropdown.Item>
              <Dropdown.Item onClick={handleType('TWK')}>TWK</Dropdown.Item>
              <Dropdown.Item onClick={handleType('TKP')}>TKP</Dropdown.Item>
            </Dropdown>
          </div>
          <div>
            <Textarea
              id='question'
              placeholder='Soal...'
              rows={4}
              value={tryout.question}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <FileInput id='imageUrl' />
          </div>
          <div>
            <ul className='space-y-2'>
              <li className='flex space-x-2'>
                <TextInput
                  className='w-4/5'
                  id='optionA'
                  placeholder='Opsi Jawaban'
                  addon='A'
                  required
                  value={tryout.optionA}
                  onChange={handleInputChange}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreA'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreA}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionB'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='B'
                  required
                  value={tryout.optionB}
                  onChange={handleInputChange}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreB'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreB}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionC'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='C'
                  required
                  value={tryout.optionC}
                  onChange={handleInputChange}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreC'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreC}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionD'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='D'
                  required
                  value={tryout.optionD}
                  onChange={handleInputChange}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreD'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreD}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionE'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='E'
                  required
                  value={tryout.optionE}
                  onChange={handleInputChange}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreE'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreE}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
            </ul>
          </div>
          <div>
            <Textarea
              id='explanation'
              placeholder='Penjelasan...'
              required
              rows={4}
              value={tryout.explanation}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex space-x-2'>
            <Button color={'failure'} size='sm' onClick={handleClear}>
              Clear
            </Button>
            <Button
              disabled={!isSave}
              color={'success'}
              size='sm'
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              disabled={!isSave}
              color={'success'}
              size='sm'
              onClick={handleSaveAndNext}
            >
              Save and Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TryoutEditor;
