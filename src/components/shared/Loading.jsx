export default function Loading() {
  return (
    <div className="flex gap-2">
      <div className="h-1 w-1 animate-bounce rounded-full bg-blue-600 [animation-delay:.7s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-blue-600 [animation-delay:.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-blue-600 [animation-delay:.7s]"></div>
    </div>
  );
}
