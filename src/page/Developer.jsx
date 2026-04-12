import Footer from "../components/Footer";
import Dimas from "../assets/team/kid-banker-dimas.png";
import Cahyo from "../assets/team/kid-banker-cahyo.png";
import Langga from "../assets/team/kid-banker-langga.png";
import Eka from "../assets/team/kid-banker-eka.png";
import Cara from "../assets/team/kid-banker-cara.png";

function Developer() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center  px-4 py-30  ">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          The Minds Behind Kid Banker
        </h1>

        <p className="text-sm text-gray-500 mb-10 text-center">
          Meet the small team making big <br />
          things happen together
        </p>

        {/* Team Grid */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* === ROW 1 (3 items) === */}

          {/* 1 */}
          <div className="rounded-xl p-6 text-left">
            <div className="flex items-center justify-center">
              <img
                src={Dimas}
                alt="Team"
                className="w-40 md:w-[250px] mb-6"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Muhammad Dimas Susilo
            </h3>
            <p className="text-gray-500 text-sm mt-1">Front End Developer</p>
          </div>

          {/* 2 */}
          <div className="rounded-xl p-6 text-left">
            <div className="flex items-center justify-center">
              <img
                src={Cahyo}
                alt="Team"
                className="w-40 md:w-[250px] mb-6"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Andika Satrio Nurcahyo
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Project Manager & Back End Developer
            </p>
          </div>

          {/* 3 */}
          <div className="rounded-xl p-6 text-left">
            <div className="flex items-center justify-center">
              <img
                src={Langga}
                alt="Team"
                className="w-40 md:w-[250px] mb-6"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Air Langga Ali Syahbani
            </h3>
            <p className="text-gray-500 text-sm mt-1">Front End Developer</p>
          </div>

          {/* === ROW 2 (2 items CENTER) === */}
          <div className="md:col-span-3 flex justify-center gap-6">
            {/* 4 */}
            <div className="w-full md:w-1/3 rounded-xl p-6 text-left">
              <div className="flex items-center justify-center">
                <img
                  src={Eka}
                  alt="Team"
                  className="w-40 md:w-[250px] mb-6"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Eka Nurfitria Septiani
              </h3>
              <p className="text-gray-500 text-sm mt-1">UI/UX Designer</p>
            </div>

            {/* 5 */}
            <div className="w-full md:w-1/3 rounded-xl p-6 text-left">
              <div className="flex items-center justify-center">
                <img
                  src={Cara}
                  alt="Team"
                  className="w-40 md:w-[250px] mb-6"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Ni Made Ayu Carasia Susanti
              </h3>
              <p className="text-gray-500 text-sm mt-1">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Developer;
