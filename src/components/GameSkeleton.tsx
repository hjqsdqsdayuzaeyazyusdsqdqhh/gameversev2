export default function GameSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/9] bg-dark-700 rounded-2xl mb-4" />
      <div className="h-5 bg-dark-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-dark-700 rounded w-1/2" />
    </div>
  );
}

export function GameDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-dark-700 rounded w-16" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="aspect-[16/9] bg-dark-700 rounded-2xl mb-6" />
          <div className="h-8 bg-dark-700 rounded w-2/3 mb-4" />
          <div className="h-4 bg-dark-700 rounded w-1/3 mb-6" />
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-dark-700 rounded w-full" />
            <div className="h-4 bg-dark-700 rounded w-5/6" />
            <div className="h-4 bg-dark-700 rounded w-4/6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-32 bg-dark-700 rounded-xl" />
            <div className="h-32 bg-dark-700 rounded-xl" />
          </div>
        </div>
        <aside className="hidden lg:block space-y-6">
          <div className="h-[600px] bg-dark-700 rounded-xl" />
          <div className="h-48 bg-dark-700 rounded-xl" />
        </aside>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[16/10] bg-dark-700 rounded-xl mb-2" />
          <div className="h-4 bg-dark-700 rounded w-3/4 mb-1" />
          <div className="h-3 bg-dark-700 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
