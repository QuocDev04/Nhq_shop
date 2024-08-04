const Loading = () => {
    return (
      <div>
        <div className="flex flex-col bg-neutral-300 w-full h-64 animate-pulse rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-10 animate-pulse rounded-md"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50  h-10 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50  h-10 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50  h-10 animate-pulse rounded-md"></div>
            <div className="bg-neutral-400/50  h-10 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    );
}
 
export default Loading;