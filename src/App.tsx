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
  const { notebook, notebooks } = useNotebook();
  const { user, loading } = useAuth();
  const path = window.location.pathname;
  const isAuthPage = path === "/auth";
  const isNotebookPage = path === "/notebooks";
  const navigate = useNavigate();

  // Wait until the initial auth loading is done
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // Always redirect to /auth if not logged in
  if (!user) {
    if (!isAuthPage) {
      window.location.replace("/auth");
    }
    return null;
  }

  // If logged in and on /auth, redirect to proper page
  if (user && isAuthPage) {
    // If they have no notebooks, show create/select page
    if (!notebooks || notebooks.length === 0) {
      window.location.replace("/notebooks");
    } else {
      // Otherwise, go straight to dashboard
      window.location.replace("/dashboard");
    }
    return null;
  }

  // If logged in and has no notebooks, force to /notebooks (unless already there)
  if (user && (!notebooks || notebooks.length === 0) && !isNotebookPage) {
    window.location.replace("/notebooks");
    return null;
  }

  // For all other normal routes
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
