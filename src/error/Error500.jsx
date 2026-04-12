function Error500() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        {/* Image */}
        <img
          src="/src/assets/500_Connection - Kid Banker.png"
          alt="500 Illustration"
          className="w-133 md:w-[400px] mb-8"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Error Connection
        </h2>

        {/* Description */}
        <p className="text-[#979797] w-90 mb-6">
          Your device may be offline or the Kid Banker server may be
          experiencing problems
        </p>
      </section>
    </>
  );
}

export default Error500;
