const getEmail = async (req, res) => {
  const { searchParams } = req.query;

  try {
    const emails = await prisma.email.findMany({
      where: {
        address: {
          contains: searchParams,
          mode: 'insensitive',
        },
      },
    });

    if (emails.length === 0) {
      return res.status(404).json({
        message:
          'Tidak ada email yang ditemukan dengan parameter pencarian tersebut',
      });
    }

    return res.status(200).json(emails);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `Terjadi kesalahan saat mencoba mencari data email ${error}`,
      });
  }
};
