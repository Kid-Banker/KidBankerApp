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
      <section className="flex flex-row h-auto items-center justify-end gap-x-80 pt-20">
        <div className="flex flex-col">
          <h1 className="text-5xl w-lg font-bold leading-snug">
            Smart Financial Management for Young Generation
          </h1>
          <p className="w-md text-md mt-10">
            Track your savings, manage expenses, and build financial discipline
            — with parental guidance and Google Calendar integration.
          </p>

          <div className="mt-8">
            <button className="px-6 py-3 flex items-center gap-1 bg-[#2785FF] text-white rounded-md font-medium text-md">
              Get Started <GoArrowRight />
            </button>
          </div>
        </div>
        <div className="h-full shadow-lg">
          <img className="h-140 w-150 rounded-lg" src={HeroImage} alt="" />
        </div>
      </section>

      <section className="py-20 flex justify-center">
        <div className="bg-black text-white flex justify-around py-10 w-5/6 rounded-lg">
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

      <section className="pb-20">
        <h1 className="text-center font-bold text-3xl mb-10 leading-snug">
          That's Why We Built <br /> This Platform
        </h1>

        <div className="flex justify-center gap-5 w-5/6 mx-auto">
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

      <section className="bg-white py-20 px-20">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          <div className="shadow-xl">
            <img src={FeatureSectionImage1} alt="Finance Monitoring" className="w-full h-auto" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 leading-snug">
              Parents Stay Informed <br /> Without Controlling <br /> Everything
            </h2>
            <p className="text-gray-700">
              Parents can monitor their child's financial activity in <br></br>
              real-time without being overly restrictive. KidBanker <br></br>{" "}
              promotes trust and independence, allowing children <br></br> to
              learn responsible money management while <br></br> parents stay
              informed when it matters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-20">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold mb-6 leading-snug">
              Never Miss a Payment <br />
              Again ParentTrack + <br />
              Google Calendar
            </h1>
            <p className="text-gray-700">
              Stay on top of every PayLater deadline with automatic <br></br>
              reminders synced to Google Calendar. Both parents <br></br> and
              kids get timely notifications, helping avoid missed <br></br>{" "}
              payments and building consistent financial habits.
            </p>
          </div>
          <div className="shadow-xl">
            <img src={FeatureSectionImage2} alt="Google Calendar" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="py-20 flex justify-center">
        <div className="bg-[#262626] text-white text-center p-10 max-w-8xl px-100 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">
            Bridging the Gap to <br /> Financial Literacy
          </h2>
          <p className="mb-8">
            Empower the next generation with financial literacy through <br />
            integrated family expense tracking and parental oversight. Start{" "}
            <br />
            managing your family's financial future today
          </p>
          <div className="flex justify-center gap-3">
            <ButtonComp to="https://s.id/KidBankerUserGuide" target="_blank" className="bg-[#515151]! px-10! py-3!">
              Watch Tutorial
            </ButtonComp>
            <ButtonComp to="/login" className={"px-10! py-3!"}>
              <div className="flex items-center gap-2">
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
