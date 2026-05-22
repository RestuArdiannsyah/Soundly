const HowSection = () => {
  return (
    <>
      <div className="px-4 pt-36 lg:px-36">
        {/* Judul Utama dengan ukuran teks yang proporsional */}
        <h1 className="text-5xl font-semibold tracking-wide text-center font-reenie text-zinc-900 dark:text-zinc-50">
          Send Feelings Through Music
        </h1>

        {/* Grid Container Card */}
        <div className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3">
          {/* CARD 1 */}
          <div className="p-6 transition-all duration-300 bg-white border shadow-xs border-zinc-200 rounded-2xl hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 group">
            {/* Indikator Angka Langkah yang Clean */}
            <span className="text-3xl font-light transition-colors text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">
              01
            </span>
            <h2 className="mt-3 mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Share a Moment
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Express your emotions through the power of music and connect with
              others who understand.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-6 transition-all duration-300 bg-white border shadow-xs border-zinc-200 rounded-2xl hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 group">
            <span className="text-3xl font-light transition-colors text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">
              02
            </span>
            <h2 className="mt-3 mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Explore Moments
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Discover the stories and emotions shared by others through music,
              and find moments that resonate with you.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-6 transition-all duration-300 bg-white border shadow-xs border-zinc-200 rounded-2xl hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 group">
            <span className="text-3xl font-light transition-colors text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">
              03
            </span>
            <h2 className="mt-3 mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Moment Details
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Dive deeper into the stories behind each song and connect on a
              more personal level by clicking on the card.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowSection;
