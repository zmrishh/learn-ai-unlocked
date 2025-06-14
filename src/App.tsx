import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const { notebook, notebooks, loading: notebooksLoading } = useNotebook();
  const { user, loading: authLoading } = useAuth();
  const path = window.location.pathname;

  // Show loading spinner if still loading
  if (authLoading || notebooksLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // Not authenticated: always show /auth
  if (!user) {
    // Only show Auth page
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

  // Authenticated but has no notebooks, stay on /notebooks
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

  // Authenticated with notebooks: go to dashboard unless already there
  if (user && notebooks && notebooks.length > 0) {
    if (
      path !== "/dashboard" &&
      path !== "/upload" &&
      path !== "/smart-notes" &&
      path !== "/chat-pdf" &&
      path !== "/quiz" &&
      path !== "/flashcards" &&
      path !== "/mindmap" &&
      path !== "/history" &&
      path !== "/profile"
    ) {
      // Everything else (including /auth or /notebooks) will go to dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // For all normal, valid app routes
  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
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
