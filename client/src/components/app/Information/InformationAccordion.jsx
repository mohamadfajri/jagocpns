import { Accordion } from 'flowbite-react';
import { Link } from 'react-router-dom';

import buyto1 from '../../../assets/images/buyto1.jpg';
import buyto2 from '../../../assets/images/buyto2.jpg';

const InformationAccordion = () => {
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>Panduan Try Out Online Gratis</Accordion.Title>
        <Accordion.Content>
          <h1>
            Dengan mendaftar di website JAGOCPNS.ID kamu dapat mengikuti Try Out
            Online secara gratis dengan cara sebagai berikut:
          </h1>
          <ul className='ml-2'>
            <li>
              {' '}
              - Masuk ke menu{' '}
              <Link
                to={'/app/dashboard'}
                className='text-blue-500 hover:underline'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <p>- Klik Disini / Klik Banner Tryout Gratis untuk Masuk Form</p>
              <img
                src='https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/freeto.jpeg'
                alt=''
              />
            </li>
            <li>- Uploud Persyaratan Yang DIbutuhkan dan Kirim</li>
            <li>- Masuk Ke Menu Tryout Saya</li>
            <li>
              - Kamu dapat mengerjakan Paket Try Out Online CPNS kapan saja kamu
              mau selama batas periode masih berlaku
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>
          Panduan Isi Saldo Via Qris Dan Transfer Bank
        </Accordion.Title>
        <Accordion.Content>
          <h1>
            Ingin Membeli Tryout Premium ? Kamu bisa membeli paket Try Out
            Online Premium dengan terlebih dahulu Isi Saldo.
          </h1>
          <h1>
            Saldo adalah nominal yang dapat kamu tukarkan dengan Tryout Premium
          </h1>
          <ul className='ml-4'>
            <li>
              <p>- Masuk ke menu TopUp Saldo</p>
              <img
                src='https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/freeto.jpeg'
                alt=''
              />
            </li>
            <li>
              <p>
                - Masukkan jumlah Saldo yang ingin kamu beli (kelipatan Rp
                20.000) Dan Klik Buat Pesanan
              </p>
              <img
                src='https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/infotopup.jpeg'
                alt=''
              />
            </li>
            <li>
              <p>
                - Kamu akan mendapatkan halaman pemberitahuan mengenai jumlah
                transfer Dan Nominal Isi Saldo
              </p>
              <img
                src='https://ghcdsezrgytedkcpribk.supabase.co/storage/v1/object/public/information/invoice.jpeg'
                alt=''
              />
            </li>
            <li>
              - Perhatian!!Harap melakukan transfer atau scan dengan jumlah
              sesuai total bayar (Panah Merah)
            </li>
            <li>- Uploud Bukti Bayar dan Tunggu Admin Konformasi</li>
            <li>
              - Jika Saldo telah bertambah, kamu dapat melakukan pembelian
              TryOut Online DiMenu Beli TryOut
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Panduan Beli Tryout</Accordion.Title>
        <Accordion.Content>
          <img src={buyto2} alt='1' />
          <img src={buyto1} alt='2' />
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default InformationAccordion;
