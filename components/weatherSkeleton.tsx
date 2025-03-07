const SkeletonLoader = () => {
  return (
    <main>
      <div className="animate-pulse">
        <div className="bg-gray-200 w-48 h-10 rounded mx-auto mb-4"></div>

        <section className="flex justify-between h-[30rem]">
          <div className="bg-secondary_s w-[68rem] ml-[10rem] h-full rounded-lg border border-solid border-gray-100 flex flex-col overflow-y-auto gap-4 p-4">
            <h2 className="text-2xl font-medium text-center mt-3 pb-3 shadow-sm">
              <div className="w-32 h-6 bg-gray-300 rounded mx-auto"></div>
            </h2>

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="w-24 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          <div className="w-80 h-full bg-gray-200 rounded-lg p-4">
            <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="w-24 h-6 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="w-32 h-6 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="w-32 h-6 bg-gray-300 rounded mx-auto mb-2"></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SkeletonLoader;
