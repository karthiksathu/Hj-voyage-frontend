import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "./components/theme/ThemeProvider";
import { LanguageProvider } from "./components/language/LanguageProvider";
import PageTransition from "./components/layout/PageTransition";

import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Lazy loaded pages
const FlightsPage = lazy(() => import("./pages/FlightsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ManageBookingsPage = lazy(() => import("./pages/ManageBookingsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const SignInPage = lazy(() => import("./pages/Signin"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Tourism = lazy(() => import("./pages/Tourism"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const Hero = lazy(() => import("./components/home/Hero"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));
const TermsPage = lazy(() => import("./pages/Terms"));
const FaqPage = lazy(() => import("./pages/FAQ"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Create QueryClient
const queryClient = new QueryClient();

// Page loading fallback with IntelliSurge palette
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-purewhite dark:bg-rhapsody">
    <div className="text-center">
      <div className="animate-pulse text-4xl font-bold mb-4 text-reef">SkyVoyage</div>
      <p className="text-meridian dark:text-reef">Loading your adventure...</p>
    </div>
  </div>
);

// Transition wrapper
const TransitionedRoute = ({ element }: { element: React.ReactNode }) => (
  <PageTransition>{element}</PageTransition>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<TransitionedRoute element={<Index />} />} />
                <Route path="/flights" element={<TransitionedRoute element={<FlightsPage />} />} />
                <Route path="/login" element={<TransitionedRoute element={<LoginPage />} />} />
                <Route path="/signin" element={<TransitionedRoute element={<SignInPage />} />} />
                <Route path="/register" element={<TransitionedRoute element={<RegisterPage />} />} />
                <Route path="/manage-bookings" element={<TransitionedRoute element={<ManageBookingsPage />} />} />
                <Route path="/support" element={<TransitionedRoute element={<SupportPage />} />} />
                <Route path="/admin" element={<TransitionedRoute element={<AdminPage />} />} />
                <Route path="/offers" element={<TransitionedRoute element={<OffersPage />} />} />
                <Route path="/profile" element={<TransitionedRoute element={<ProfilePage />} />} />
                <Route path="/destinations" element={<TransitionedRoute element={<Tourism />} />} />
                <Route path="/about" element={<TransitionedRoute element={<AboutUsPage />} />} />
                <Route path="/home" element={<TransitionedRoute element={<Hero />} />} />
                <Route path="/forgot-psw" element={<TransitionedRoute element={<ForgotPassword />} />} />
                <Route path="/reset-psw" element={<TransitionedRoute element={<ResetPassword />} />} />
                <Route path="/verify-psw" element={<TransitionedRoute element={<VerifyOtp />} />} />
                <Route path="/terms-&-conditions" element={<TransitionedRoute element={<TermsPage />} />} />
                <Route path="/faq" element={<TransitionedRoute element={<FaqPage />} />} />
                <Route path="/contact-support" element={<TransitionedRoute element={<ContactSupport />} />} />
                <Route path="/privacy-policy" element={<TransitionedRoute element={<PrivacyPolicy />} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
