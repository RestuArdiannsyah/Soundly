const InputLabel = (props) => {
  const { label, id, type, className = "", ...rest } = props;

  return (
    <div className="flex flex-col w-full font-body">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          {...rest}
          className={`w-full p-3 border rounded-md resize-none min-h-36 transition-all duration-300
          border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-sm leading-relaxed
          focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400
          
          /* PENYESUAIAN KHUSUS UNTUK BACKGROUND ZINC-800 */
          dark:bg-zinc-700/30 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500
          backdrop-blur-sm
          dark:focus:ring-1 dark:focus:ring-indigo-400 dark:focus:border-indigo-400
          ${className}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          {...rest}
          className={`w-full h-10 p-3 border rounded-md transition-all duration-300
          border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-sm
          focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400
          
          /* PENYESUAIAN KHUSUS UNTUK BACKGROUND ZINC-800 */
          dark:bg-zinc-700/30 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500
          backdrop-blur-sm
          dark:focus:ring-1 dark:focus:ring-indigo-400 dark:focus:border-indigo-400
          ${className}`}
        />
      )}
    </div>
  );
};

export default InputLabel;