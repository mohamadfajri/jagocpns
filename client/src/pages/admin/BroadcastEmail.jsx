import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import StatusBox from './StatusBox';
import { useEffect, useState } from 'react';
import { fetchAdmin } from '../../utils/fetchAdmin';

const BroadcastEmail = () => {
  const [status, setStatus] = useState({ status: 'Waiting', message: '' });
  const [selectedRange, setSelectedRange] = useState(null);
  const [form, setForm] = useState({
    target: '',
    subject: '',
    body: '',
  });
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await fetchAdmin('/users/count');
      setTotal(data.count);
    };
    getCount();
  }, []);

  const generateRanges = (total) => {
    const ranges = [];
    for (let start = 1; start <= total; start += 500) {
      const end = Math.min(start + 499, total);
      ranges.push({ start, end });
    }
    return ranges;
  };

  const ranges = generateRanges(total);

  const handleRange = (e) => {
    const selected = ranges[e.target.value];
    setSelectedRange(selected);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRunTest = async () => {
    try {
      setStatus({ status: 'Processing', message: 'Sending email...' });
      const { data } = await fetchAdmin.post('/test-mail', {
        subject: form.subject,
        body: form.body,
        email: form.target,
      });
      console.log(data);
      setStatus({ status: 'Success', message: '' });
    } catch (error) {
      console.error(error);
      setStatus({ status: 'Failed', message: error.response.data.eror });
    }
  };

  const sendBroadcast = async () => {
    try {
      setStatus({ status: 'Processing', message: '' });
      const { data } = await fetchAdmin.post('/broadcast', {
        subject: form.subject,
        body: form.body,
        range: selectedRange,
      });
      setStatus({ status: 'Success', message: '' });
      return data;
    } catch (error) {
      setStatus({ status: 'Failed', message: error.response.data.error });
    }
  };

  const handleBroadcast = async () => {
    await sendBroadcast();
  };

  return (
    <div className='py-4 ml-64 dark:bg-black min-h-screen'>
      <div className='mb-2 mx-4'>
        <h1 className='text-2xl font-semibold'>Broadcaster</h1>
      </div>
      <div className='mb-2 mx-4'>
        <div className='mb-2 block'>
          <Label htmlFor='status' value='Status :' />
        </div>
        <StatusBox
          id='status'
          status={status.status}
          message={status.message}
        />
      </div>
      <div className='mb-2 mx-4'>
        <div className='mb-2 block'>
          <Label htmlFor='range' value='Range' />
        </div>
        <div className='flex flex-col'>
          <select
            id='range'
            onChange={handleRange}
            className='border p-2 rounded'
            required
          >
            <option value=''>Select Range</option>
            {ranges.map((range, index) => (
              <option key={index} value={index}>
                {range.start} - {range.end}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mb-2 mx-4'>
        <div className='mb-2 block'>
          <Label htmlFor='test' value='Test Target' />
        </div>
        <TextInput
          id='test'
          name='target'
          type='email'
          icon={HiMail}
          placeholder='youremail@mail.com'
          required
          value={form.target}
          onChange={handleChange}
        />
      </div>
      <div className='mb-2 mx-4'>
        <div className='mb-2 block'>
          <Label htmlFor='subject' value='Subject' />
        </div>
        <TextInput
          id='subject'
          name='subject'
          placeholder='Subject of the email'
          required
          value={form.subject}
          onChange={handleChange}
        />
      </div>
      <div className='mb-4 mx-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='body' value='Body' />
          </div>
          <Textarea
            id='body'
            name='body'
            placeholder='Text/HTML supported'
            required
            rows={8}
            value={form.body}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='mb-2 mx-4'>
        <div className='flex space-x-4'>
          <Button onClick={handleRunTest} color={'success'}>
            RUN TEST
          </Button>
          <Button onClick={handleBroadcast} color={'blue'}>
            START BROADCAST
          </Button>
        </div>
      </div>
      <div className='mb-2 mx-4'></div>
    </div>
  );
};

export default BroadcastEmail;
