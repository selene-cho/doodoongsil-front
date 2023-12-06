export default function Header({ children, className }) {
  return (
    <header
      className={`${className} mb-2 border-b border-slate-300 p-3 text-center font-bold`}
    >
      {children}
    </header>
  );
}
