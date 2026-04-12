import ButtonComp from "../components/ButtonComp";
import Error404Img from "../assets/404.png";

function Error404() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        {/* Image */}
        <img
          src={Error404Img}
          alt="404 Illustration"
          className="w-133 md:w-[400px] mb-8"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops, We’re Lost!
        </h2>

        {/* Description */}
        <p className="text-[#979797] w-90 mb-6">
          Looks like you’ve taken a wrong turn. Let’s get you back on the right
          track!
        </p>

        {/* Button */}
        <ButtonComp>
          <div className="flex items-center gap-3">Go Back</div>
        </ButtonComp>
      </section>
    </>
  );
}

export default Error404;
