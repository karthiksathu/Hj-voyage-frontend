import { useState } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useLanguage } from "@/components/language/LanguageProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/main-nav";
import  Footer  from "@/components/layout/Footer";
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";
 
const Login = () => {
  const { translations, isRtl } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
   
    try {
      // Simulating login for now
      await new Promise((resolve) => setTimeout(resolve, 1500));
     
      toast({
        title: "Login successful!",
        description: "Welcome back to VoyageScapes.",
      });
     
      // Redirect to admin or homepage based on role
      // This would be handled by a router in a real application
      window.location.href = "/admin";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <ThemeProvider defaultTheme="system" storageKey="voyagescapes-theme">
      <div className={cn("min-h-screen flex flex-col", isRtl ? "direction-rtl" : "")}>
        <MainNav />
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Welcome message */}
              <div className="md:w-1/2 bg-gradient-to-br from-travel-blue via-travel-teal to-travel-light-teal flex flex-col justify-center items-center p-8 text-white">
                <div className="max-w-md text-center space-y-6">
                  <h1 className="text-3xl md:text-4xl font-bold animate-fade-in">
                    {translations.login.welcomeBack || "Welcome Back"}
                  </h1>
                  <p className="text-lg opacity-90 animate-fade-in delay-100">
                    {translations.login.welcomeMessage ||
                     "We're excited to have you back. Access your travel plans and explore new destinations with VoyageScapes."}
                  </p>
                  <div className="hidden md:block mt-8">
                    <div className="rounded-full bg-white/20 p-8 w-32 h-32 mx-auto animate-float">
                      <div className="rounded-full bg-white/30 p-6 h-full w-full flex items-center justify-center">
                        <LogIn className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              {/* Right side - Login form */}
              <div className="md:w-1/2 bg-background p-8 md:p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">{translations.login.title || "Sign in"}</h2>
                    <p className="text-muted-foreground mt-2">
                      {translations.login.description || "Enter your credentials to access your account"}
                    </p>
                  </div>
                 
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">{translations.login.email || "Email"}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                   
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">{translations.login.password || "Password"}</Label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-primary hover:underline transition-colors"
                        >
                          {translations.login.forgotPassword || "Forgot password?"}
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          required
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                   
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={() => setRememberMe(!rememberMe)}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {translations.login.rememberMe || "Remember me"}
                      </label>
                    </div>
                   
                    <Button
                      type="submit"
                      className="w-full transition-all shadow-lg hover:shadow-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {translations.login.signingIn || "Signing in..."}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn size={18} />
                          {translations.login.signIn || "Sign in"}
                        </span>
                      )}
                    </Button>
                   
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-muted"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          {translations.login.orContinueWith || "Or continue with"}
                        </span>
                      </div>
                    </div>
                   
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="hover:bg-accent">Google</Button>
                      <Button variant="outline" className="hover:bg-accent">Apple</Button>
                    </div>
                   
                    <div className="text-center text-sm mt-6">
                      <span className="text-muted-foreground">
                        {translations.login.noAccount || "Don't have an account?"}
                      </span>{" "}
                      <Link to="/signup" className="text-primary hover:underline transition-colors">
                        {translations.login.signUp || "Sign up"}
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
 
export default Login;