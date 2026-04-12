import ButtonComp from "../components/ButtonComp";
import Error403Img from "../assets/401-403.png";

function Error403() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        {/* Image */}
        <img
          src={Error403Img}
          alt="403 Illustration"
          className="w-133 md:w-[400px] mb-8"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops, No Entry!
        </h2>

        {/* Description */}
        <p className="text-[#979797] w-90 mb-6">
          Sorry, you don't have access to this page. Maybe ask your parents for
          help?
        </p>

        {/* Button */}
        <ButtonComp>
          <div className="flex items-center gap-3">Go Back</div>
        </ButtonComp>
      </section>
    </>
  );
}

export default Error403;
