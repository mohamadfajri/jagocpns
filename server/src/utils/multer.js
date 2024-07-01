const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const upload = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  const files = req.files;

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
  const fileUploadPromises = [];

  const fileFields = [
    'image',
    'imageA',
    'imageB',
    'imageC',
    'imageD',
    'imageE',
    'imageExplanation',
  ];

  fileFields.forEach((field) => {
    if (files[field]) {
      const fileName = `public/${dateTime}-${files[field].name}`;
      const uploadPromise = supabase.storage
        .from('images')
        .upload(fileName, files[field].data)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          req[
            `${field}`
          ] = `${SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;
        });
      fileUploadPromises.push(uploadPromise);
    }
  });

  try {
    await Promise.all(fileUploadPromises);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = upload;
