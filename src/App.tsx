
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { NotebookProvider, useNotebook } from "./context/NotebookContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import SmartNotes from "./pages/SmartNotes";
import ChatPDF from "./pages/ChatPDF";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Mindmap from "./pages/Mindmap";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import React from "react";
import Notebooks from "./pages/Notebooks";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

function AppContent() {
  const { notebooks, loading: notebooksLoading } = useNotebook();
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (authLoading || notebooksLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // 1. Handle UNAUTHENTICATED: Only allow /auth, redirect all else to /auth
  if (!user) {
    if (path !== "/auth") {
      return <Navigate to="/auth" replace />;
    }
    return (
      <>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </>
    );
  }

  // 2. Handle LOGGED IN WITH NO NOTEBOOK: Only allow /notebooks, redirect all else to /notebooks
  if (user && (!notebooks || notebooks.length === 0)) {
    if (path !== "/notebooks") {
      return <Navigate to="/notebooks" replace />;
    }
    return (
      <>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="*" element={<Navigate to="/notebooks" replace />} />
        </Routes>
      </>
    );
  }

  // 3. LOGGED IN WITH NOTEBOOK(s): only allow valid app routes, otherwise redirect to /dashboard
  const validRoutes = [
    "/dashboard",
    "/upload",
    "/smart-notes",
    "/chat-pdf",
    "/quiz",
    "/flashcards",
    "/mindmap",
    "/history",
    "/profile"
  ];
  // If at /notebooks or /auth (after login with notebook), go to dashboard.
  if (path === "/notebooks" || path === "/auth" || path === "/" || !validRoutes.includes(path)) {
    return <Navigate to="/dashboard" replace />;
  }

  // 4. Normal valid routes (authenticated with notebook)
  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/smart-notes" element={<SmartNotes />} />
          <Route path="/chat-pdf" element={<ChatPDF />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/mindmap" element={<Mindmap />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotebookProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </NotebookProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
