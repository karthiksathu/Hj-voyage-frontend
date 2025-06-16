import { useState, useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 32);

    return () => clearInterval(interval);
  }, [children]);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "#024b74" }} 
      >
        <div className="flex flex-col items-center text-center">
          {/* Title */}
          <h1
            className="text-5xl font-bold mb-6 animate-pulse"
            style={{ color: "#ffffff" }} 
          >
            HJ Voyages
          </h1>

          {/* Progress bar */}
          <div
            className="w-64 rounded-full h-2 overflow-hidden mb-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)", // translucent white
            }}
          >
            <div
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: "#0372aa", // Reef Escape
              }}
            />
          </div>

          {/* % text below progress bar */}
          <p style={{ color: "#ffffff" }}>{progress}%</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageTransition;
