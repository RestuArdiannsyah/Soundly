import Navbar from "../fragments/Navbar";

const MainLayouts = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-4 pt-28 lg:px-96 md:px-40 dark:bg-zinc-800">
        {children}
      </main>
    </div>
  );
};

export default MainLayouts;
