
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { NotebookProvider, useNotebook } from "./context/NotebookContext";
import { NotebookSelector } from "./components/NotebookSelector";
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

const queryClient = new QueryClient();

function AppContent() {
  const { notebook } = useNotebook();
  const path = window.location.pathname;
  const isLogin = path === "/login";
  return (
    <>
      <Toaster />
      <Sonner />
      {/* Notebook selection dialog, except on login */}
      {!notebook && !isLogin && <NotebookSelector open={!notebook} />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
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
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotebookProvider>
        <AppContent />
      </NotebookProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
