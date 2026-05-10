export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4 animate-pulse">
      <div className="h-8 w-1/3 bg-muted rounded-md mb-2"></div>
      <div className="h-64 w-full bg-muted rounded-2xl"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl"></div>
        ))}
      </div>
      <div className="h-8 w-1/4 bg-muted rounded-md mt-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
