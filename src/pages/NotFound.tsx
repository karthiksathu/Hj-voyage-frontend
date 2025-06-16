import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-md animate-fade-in">
        <div className="text-6xl font-bold text-[#0372aa] mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4 text-[#002444]">Page Not Found</h1>
        <p className="text-[#024b74] mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <div className="space-y-3">
          <Button
            size="lg"
            asChild
            className="bg-[#0372aa] hover:bg-[#024b74] text-white"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
