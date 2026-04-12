import Navbar from "../components/Navbar";
import ButtonComp from "../components/ButtonComp";
import { RiLightbulbLine } from "react-icons/ri";
import { ImStack } from "react-icons/im";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import HeroImage from "../assets/hero-section.png";
import FeatureSectionImage1 from "../assets/feature-section-1.png";
import FeatureSectionImage2 from "../assets/feature-section-2.png";
import FinanceHero from "../components/section/FinanceHero";

function Landing() {
  const reasonList = [
    {
      icon: <RiLightbulbLine className="text-white text-3xl" />,
      title: "Smart Financial Learning",
      description:
        "Helps children understand interactive financial tracking. Parents can guide and monitor their child’s financial habits in a structured way.",
    },
    {
      icon: <ImStack className="text-white text-3xl" />,
      title: "Smart Reminder & Parental Control",
      description:
        "Never miss a payment with automated reminders via Google Calendar. Parents stay in control by monitoring and guiding their child’s financial.",
    },
    {
      icon: <HiOutlineLockClosed className="text-white text-3xl" />,
      title: "Seamless & Connected Experience",
      description:
        "Integrated with Google services to simplify login and automate reminders. Everything works smoothly, making financial management easier.",
    },
  ];

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#F9F9FA]">
      <section className="flex flex-col-reverse md:flex-row h-auto items-center justify-center md:justify-end gap-10 md:gap-x-80 pt-32 md:pt-20 px-6 md:px-0 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-5xl max-w-lg font-bold leading-snug">
            Smart Financial Management for Young Generation
          </h1>
          <p className="max-w-md text-sm md:text-md mt-6 md:mt-10">
            Track your savings, manage expenses, and build financial discipline
            — with parental guidance and Google Calendar integration.
          </p>

          <div className="mt-8 flex justify-center md:justify-start">
            <ButtonComp to="/login" className="px-6 py-3 flex items-center gap-1 bg-[#2785FF] text-white rounded-md font-medium text-md">
              Get Started <GoArrowRight />
            </ButtonComp>
          </div>
        </div>
        <div className="h-full shadow-lg w-full max-w-[350px] md:max-w-none md:w-auto">
          <img className="lg:h-auto md:h-140 lg:w-full md:w-150 hidden md:block lg:block rounded-lg object-cover" src={HeroImage} alt="Hero" />
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-0 flex justify-center">
        <div className="bg-black text-white flex flex-col md:flex-row justify-around gap-10 md:gap-0 py-10 w-full md:w-5/6 rounded-lg">
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">85%</h1>
            <p className="text-sm text-[#9FADBD]">
              Teens struggle managing money
            </p>
          </div>
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl font-bold">70%</h1>
            <p className="text-sm text-[#9FADBD]">Youth don't track expenses</p>
          </div>
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl font-bold">90%</h1>
            <p className="text-sm text-[#9FADBD]">
              Parents want financial transparency
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-20 px-6 md:px-0 mt-10 md:mt-0">
        <h1 className="text-center font-bold text-2xl md:text-3xl mb-10 leading-snug">
          That's Why We Built <br /> This Platform
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full md:w-5/6 mx-auto">
          {reasonList.map((reason, index) => (
            // ↓ FIX: hapus duplikat className, ganti </div> jadi </section>
            <section
              key={index}
              className="max-w-sm bg-white border-2 border-gray-200 hover:border-blue-500 duration-200 hover:border-2 rounded-lg"
            >
              <div className="p-6">
                <div className="flex justify-center items-center bg-blue-500 w-12 h-12 rounded-full">
                  {reason.icon}
                </div>
                <h5 className="text-lg font-bold text-black py-3">
                  {reason.title}
                </h5>
                <p className="text-sm text-[#12141D]">{reason.description}</p>
              </div>
            </section> // ← FIX: </div> → </section>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20 px-6 md:px-20 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl mx-auto">
          <div className="shadow-xl">
            <img src={FeatureSectionImage1} alt="Finance Monitoring" className="w-full h-auto rounded-lg" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-snug">
              Parents Stay Informed <br className="hidden md:block" /> Without Controlling <br className="hidden md:block" /> Everything
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Parents can monitor their child's financial activity in <br className="hidden md:block"></br>
              real-time without being overly restrictive. KidBanker <br className="hidden md:block"></br>{" "}
              promotes trust and independence, allowing children <br className="hidden md:block"></br> to
              learn responsible money management while <br className="hidden md:block"></br> parents stay
              informed when it matters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6 md:px-20 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl mx-auto">
          <div className="order-2 md:order-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-snug">
              Never Miss a Payment <br className="hidden md:block" />
              Again ParentTrack + <br className="hidden md:block" />
              Google Calendar
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              Stay on top of every PayLater deadline with automatic <br className="hidden md:block"></br>
              reminders synced to Google Calendar. Both parents <br className="hidden md:block"></br> and
              kids get timely notifications, helping avoid missed <br className="hidden md:block"></br>{" "}
              payments and building consistent financial habits.
            </p>
          </div>
          <div className="shadow-xl order-1 md:order-2">
            <img src={FeatureSectionImage2} alt="Google Calendar" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-0 flex justify-center">
        <div className="bg-[#262626] w-full text-white text-center p-8 md:p-10 max-w-8xl md:px-100 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
            Bridging the Gap to <br className="hidden md:block" /> Financial Literacy
          </h2>
          <p className="mb-8 text-sm md:text-base text-gray-300">
            Empower the next generation with financial literacy through <br className="hidden md:block" />
            integrated family expense tracking and parental oversight. Start{" "}
            <br className="hidden md:block" />
            managing your family's financial future today
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
            <ButtonComp to="https://s.id/KidBankerUserGuide" target="_blank" className="bg-[#515151]! w-full sm:w-auto px-10! py-3!">
              Watch Tutorial
            </ButtonComp>
            <ButtonComp to="/login" className="w-full sm:w-auto px-10! py-3!">
              <div className="flex justify-center items-center gap-2 w-full">
                Get Started <FaArrowRight />
              </div>
            </ButtonComp>
          </div>
        </div>
      </section>

      <FinanceHero />
    </section>
  );
}

export default Landing;
