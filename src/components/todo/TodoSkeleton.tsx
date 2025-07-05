import { Skeleton } from "../ui/skeleton";

export function TodoSkeleton() {
  return (
    <div className="flex gap-3 mb-5 items-center p-2 border border-gray-500/50 rounded-md">
      <div className="w-10 flex-shrink-0 h-full flex items-center justify-center">
        <Skeleton className="w-5 h-5 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2 justify-start flex-1">
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="flex gap-2 items-center">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-28 rounded-md" />
      </div>
    </div>
  );
}
