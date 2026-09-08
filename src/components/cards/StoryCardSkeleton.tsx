export function StoryCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx}
          className="bg-[#10141D] border border-[#252B38] rounded-xl p-5 animate-pulse relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-[#171C27] rounded" />
              <div className="h-3 w-16 bg-[#171C27] rounded" />
            </div>
            <div className="h-4 w-12 bg-[#171C27] rounded" />
          </div>

          <div className="h-6 w-5/6 bg-[#171C27] rounded mb-2" />
          <div className="h-6 w-3/4 bg-[#171C27] rounded mb-4" />

          <div className="space-y-2 mb-4">
            <div className="h-3.5 w-full bg-[#171C27]/70 rounded" />
            <div className="h-3.5 w-4/5 bg-[#171C27]/70 rounded" />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#252B38]/60">
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-[#171C27] rounded" />
              <div className="h-4 w-20 bg-[#171C27] rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-16 bg-[#171C27] rounded" />
              <div className="h-7 w-7 bg-[#171C27] rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
