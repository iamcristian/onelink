import SearchForm from "@/components/home/SearchForm";

const Home = () => {
  return (
    <div className="relative text-center px-4 py-16 md:py-24 min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Floating background blur glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[60px] md:blur-[90px] pointer-events-none" />

      {/* Heading Section */}
      <div className="max-w-3xl z-10 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50">
          Everything you are. <br />
          In <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">One, simple link</span> in bio.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
          Join millions of creators, builders, and professionals sharing their work. 
          Configure social links, customize visual themes, and track link performance all in one place.
        </p>
      </div>

      <div className="w-full max-w-md mt-10 z-10">
        <SearchForm />
      </div>
    </div>
  );
};

export default Home;
