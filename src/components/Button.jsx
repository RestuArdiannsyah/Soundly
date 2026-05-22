const Button = ({
  children,
  icon: Icon,
  type = "button",
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`w-full h-10 flex items-center justify-center gap-2 px-5 font-semibold transition-all duration-300 rounded-md cursor-pointer text-sm
        bg-zinc-950 text-zinc-100 hover:bg-zinc-800 
        
        /* GAYA DARK MODE SOLID (Sangat kontras di atas zinc-800) */
        dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:shadow-sm
        
        ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
