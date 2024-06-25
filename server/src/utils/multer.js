const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const upload = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;

  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
  };
  const dateTime = formatDateTime();

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`public`, file.data, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }

  req.fileURL = `${SUPABASE_URL}/storage/v1/object/public/${dateTime}`;
  next();
};

module.exports = upload;
