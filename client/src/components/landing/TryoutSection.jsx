import TryoutCards from "./TryoutCards";
import to1 from "../../assets/images/TO Gratis 1.png";
import to2 from "../../assets/images/TO Gratis 2.png";
import to3 from "../../assets/images/TO Gratis 3.png";
import to4 from "../../assets/images/TO Premium 1.png";
import to5 from "../../assets/images/TO Premium 2.png";
import to6 from "../../assets/images/TO Premium 3.png";
import landingCard from "../../assets/images/landingcard.png";

const TryoutSection = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900">
      <div className="text-center dark:text-white">
        <h1 className="sm:text-4xl font-semibold">Tryout</h1>
        <h2 className="sm:text-xl mt-4">
          Ikuti tryout gratis & Premium setiap minggu serentak bersama peserta
          di seluruh Indonesia
        </h2>
      </div>
      <div className="p-4 max-w-screen-xl ">
        <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-12 gap-4">
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
          <TryoutCards
            title={"Tryout SKB (Semua Formasi)"}
            imageUrl={landingCard}
          />
        </div>
      </div>
    </section>
  );
};

export default TryoutSection;
