export default function Block({ children, className, category }) {
  return (
    <div
      className={`flex flex-col items-center border border-indigo-200 rounded-lg px-4 py-5 mb-5 ${className}`}
    >
      <p className="font-bold">{category}</p>
      {children}
    </div>
  );
}
