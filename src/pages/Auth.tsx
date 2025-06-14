
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn, UserPlus, Google } from "lucide-react";

const Auth: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard", { replace: true });
      }
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Email/Password sign up/login
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let error = null;
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please enter your email and password.",
      });
      setLoading(false);
      return;
    }

    const redirectUrl = `${window.location.origin}/`; // Important for email confirmation links

    if (authMode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      error = signUpError;
    }

    setLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: `Auth failed`,
        description: error.message,
      });
    } else {
      toast({
        title: authMode === "login" ? "Logged In!" : "Success! Check your email",
        description:
          authMode === "login"
            ? "You've been logged in."
            : "Registration almost done. Please check your email to confirm (unless email confirmations are disabled).",
      });
      // Redirects handled by onAuthStateChange, no need to call navigate here.
    }
  };

  // Google Auth
  const handleGoogle = async () => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
    setLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Learnado</CardTitle>
          <CardDescription>
            {authMode === "login" ? "Sign in to your account" : "Create account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={authMode === "login" ? "current-password" : "new-password"}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading
                ? <Loader2 className="animate-spin w-4 h-4" />
                : authMode === "login"
                  ? <><LogIn className="w-4 h-4 mr-1" />Log in</>
                  : <><UserPlus className="w-4 h-4 mr-1" />Sign up</>
              }
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
              type="button"
              onClick={handleGoogle}
              disabled={loading}
            >
              <Google className="w-4 h-4" />
              Continue with Google
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-2 text-xs">
          <div>
            {authMode === "login"
              ? (
                <>
                  Don't have an account?{" "}
                  <button className="underline text-primary" type="button" onClick={() => setAuthMode("signup")}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button className="underline text-primary" type="button" onClick={() => setAuthMode("login")}>
                    Log in
                  </button>
                </>
              )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
