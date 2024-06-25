const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const upload = async (req, res, next) => {
  if (!req.files || !req.files.image) {
    return next();
  }

  const file = req.files.image;

  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  };

  const dateTime = formatDateTime();
  const fileName = `public/${dateTime}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file.data);

  if (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }

  req.imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
  next();
};

module.exports = upload;
