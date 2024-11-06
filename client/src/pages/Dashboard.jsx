import HiUser from "../components/app/Dashboard/HiUser";
import { DashboardCard } from "../components/app/Dashboard/dashboardCard.jsx";
import { DashBoardCalendar } from "../components/app/Dashboard/dashBoardCalendar.jsx";
import dashboardBanner from "../assets/images/dashboardBanner/dashboardBanner.png";

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="sm:py-10 pl-10 pe-5 pb-14 sm:ml-64 dark:bg-black min-h-screen">
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-4">
              <HiUser />
              <div className="mt-8">
                <DashboardCard />
              </div>
              <div className="mt-5">
                <img src={dashboardBanner} alt="" />
              </div>
              <div className="bg-white rounded-xl mt-5 p-4">
                <div className="flex items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17.645" cy="17.645" r="17.645" fill="#FFF8E5" />
                    <path
                      d="M21.6632 10.0017C22.1623 10.0016 22.6428 10.1911 23.0077 10.5317C23.3725 10.8723 23.5944 11.3387 23.6285 11.8366L23.6329 11.9714V21.8198C23.6327 21.9292 23.6735 22.0347 23.7472 22.1155C23.8209 22.1964 23.9221 22.2467 24.0311 22.2566C24.14 22.2664 24.2487 22.2352 24.3357 22.1689C24.4228 22.1027 24.4818 22.0063 24.5013 21.8986L24.5083 21.8198V12.6402C24.9653 12.6913 25.3899 12.9006 25.7087 13.2319C26.0275 13.5632 26.2204 13.9955 26.2539 14.4541L26.2592 14.5976V21.1633C26.2592 21.89 25.9812 22.5892 25.4821 23.1174C24.983 23.6456 24.3007 23.9629 23.5751 24.004L23.4141 24.0084H11.5959C10.8692 24.0084 10.17 23.7304 9.64181 23.2313C9.11358 22.7322 8.79636 22.0499 8.75522 21.3243L8.75084 21.1633V11.9714C8.75078 11.4723 8.94019 10.9918 9.28079 10.627C9.62139 10.2622 10.0878 10.0402 10.5857 10.0061L10.7205 10.0017H21.6632ZM15.0959 16.1296H12.0319C11.8578 16.1296 11.6908 16.1988 11.5676 16.3219C11.4445 16.4451 11.3753 16.6121 11.3753 16.7862V19.8501C11.3753 20.2126 11.6695 20.5067 12.0319 20.5067H15.0959C15.27 20.5067 15.437 20.4375 15.5601 20.3144C15.6832 20.1913 15.7524 20.0243 15.7524 19.8501V16.7862C15.7524 16.6121 15.6832 16.4451 15.5601 16.3219C15.437 16.1988 15.27 16.1296 15.0959 16.1296ZM20.3519 19.1936H18.1651L18.0758 19.1997C17.911 19.2224 17.7609 19.3068 17.656 19.4358C17.551 19.5649 17.4989 19.7289 17.5102 19.8949C17.5216 20.0609 17.5955 20.2163 17.717 20.3299C17.8386 20.4435 17.9987 20.5067 18.1651 20.5067H20.3519L20.4412 20.5006C20.606 20.4779 20.756 20.3935 20.861 20.2645C20.966 20.1354 21.018 19.9714 21.0067 19.8054C20.9954 19.6394 20.9214 19.484 20.7999 19.3704C20.6783 19.2568 20.5182 19.1936 20.3519 19.1936ZM14.4393 17.4428V19.1936H12.6885V17.4428H14.4393ZM20.3501 16.1296L18.1633 16.134L18.074 16.1393C17.9076 16.1603 17.7556 16.2443 17.6491 16.3739C17.5427 16.5035 17.4898 16.6689 17.5015 16.8362C17.5131 17.0035 17.5884 17.1601 17.7118 17.2737C17.8352 17.3873 17.9974 17.4493 18.1651 17.4471L20.3527 17.4428L20.4412 17.4366C20.606 17.4139 20.7561 17.3295 20.8611 17.2004C20.9661 17.0712 21.0181 16.907 21.0067 16.741C20.9952 16.575 20.9211 16.4195 20.7994 16.306C20.6777 16.1925 20.5174 16.1295 20.351 16.1296M20.3519 13.0692H12.0319L11.9426 13.0753C11.7778 13.098 11.6278 13.1824 11.5228 13.3114C11.4178 13.4404 11.3657 13.6045 11.3771 13.7705C11.3884 13.9364 11.4623 14.0919 11.5839 14.2055C11.7054 14.3191 11.8656 14.3822 12.0319 14.3823H20.3519L20.4412 14.377C20.6074 14.356 20.7592 14.2721 20.8656 14.1427C20.9721 14.0133 21.025 13.8481 21.0136 13.681C21.0022 13.5138 20.9273 13.3574 20.8043 13.2436C20.6812 13.1299 20.5194 13.0675 20.3519 13.0692Z"
                      fill="#FFB001"
                    />
                  </svg>

                  <p className="text-2xl font-semibold">Berita</p>
                </div>

                <div className="mt-3 text-justify">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quod expedita, iste minus pariatur non tempora sed nobis
                    molestiae aut magnam dolor ea voluptatem ducimus fugit
                    ipsam! Laudantium quisquam fugit doloribus aut laborum
                    officia, earum iste quam amet? Laudantium qui voluptas illo
                    est veniam laboriosam repudiandae perferendis maxime,
                    tempora harum maiores eos nam placeat sunt eum iusto
                    recusandae voluptatibus doloremque, porro quaerat? Dolores
                    fugiat vitae consequuntur ab atque quasi eum ullam nostrum
                    consectetur repudiandae ipsam fuga quam, necessitatibus aut
                    adipisci, magnam nulla mollitia. Eligendi at omnis
                    repudiandae exercitationem ipsa fugit explicabo harum fuga,
                    perspiciatis assumenda consequuntur aliquam odit eum nostrum
                    sunt, voluptatibus est totam. Incidunt odit illo alias
                    dignissimos et quisquam. Autem ad incidunt exercitationem
                    vel veritatis aperiam at saepe necessitatibus tempora
                    delectus asperiores ipsam odit numquam optio sequi sint,
                    nesciunt voluptatum, culpa, quo ullam. Corrupti labore
                    tempora adipisci sed voluptas! Aperiam at doloribus,
                    sapiente, molestiae corrupti laboriosam, accusamus placeat
                    iste vitae velit exercitationem ducimus nulla repellendus
                    est explicabo. Perferendis doloremque reiciendis impedit
                    nostrum explicabo itaque. Perspiciatis enim delectus saepe
                    aliquam ex sit vero ad labore recusandae, placeat ullam
                    dolor earum sed deserunt. Odit incidunt vitae placeat
                    reprehenderit quidem atque voluptates. Harum, quibusdam
                    reprehenderit ex quos quaerat corrupti quia doloremque
                    illum?
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sticky top-0">
              <DashBoardCalendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
