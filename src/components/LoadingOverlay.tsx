import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { WandSparkles } from "lucide-react";

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isVisible || !mounted) return null;

  return createPortal(
    <div className="w-screen h-[500vh] bg-gray-700/40 dark:bg-gray-700/20 z-[100000] fixed top-0 left-0">
      <div className="z-[100001] flex items-center justify-center w-screen h-screen fixed top-0 left-0">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-accent-dark dark:border-white"></div>
        <h4 className="text-xl font-bold z-[100001] flex flex-col gap-2 items-center justify-center">
          <WandSparkles className="text-[#ff6013]" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-[#ff6013] dark:to-[#ff9259] from-[#ff6013] to-[#ff874a] font-bold">
            Todo
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-[#ff6013] dark:to-[#ff9259] from-[#ff6013] to-[#ff874a] font-bold">
            Dashboard
          </span>
        </h4>
      </div>
    </div>,
    document.body
  );
};

export default LoadingOverlay;
