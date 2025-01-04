import SearchForm from "@/components/home/SearchForm";

const Home = () => {
  return (
    <div className="text-center px-4 py-16 min-h-screen">
      {/* Heading Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Everything you are. <br />
          In <span className="text-neutral-500">One</span>, simple{" "}
          <span className="text-neutral-500">Link</span> in bio.
        </h1>
        <p className="text-lg text-secondary mb-8">
          Join 50M+ people using OneLink for their link in bio. One link to help
          you share everything you create, curate, and sell from your Instagram,
          TikTok, X, and more.
        </p>
      </div>

      <SearchForm />
    </div>
  );
};

export default Home;
