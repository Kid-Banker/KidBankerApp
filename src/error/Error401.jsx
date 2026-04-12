import ButtonComp from "../components/ButtonComp";

function Error401() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        {/* Image */}
        <img
          src="/src/assets/401_403 - Kid Banker.png"
          alt="401 Illustration"
          className="w-133 md:w-[400px] mb-8"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Knock, Knock!</h2>

        {/* Description */}
        <p className="text-[#979797] w-80 mb-6">
          You need to sign in to see what's inside. Let's get you logged back
          in!
        </p>

        {/* Button */}
        <ButtonComp>
          <div className="flex items-center gap-3">Sign In</div>
        </ButtonComp>
      </section>
    </>
  );
}

export default Error401;
