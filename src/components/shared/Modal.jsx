export default function Modal({ children }) {
  return (
    <div className="absolute inset-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-zinc-900/80">
      {children}
    </div>
  );
}
