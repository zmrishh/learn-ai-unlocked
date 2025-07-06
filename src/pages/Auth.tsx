import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Auth: React.FC = () => {
  const { toast } = useToast();
  const { login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      toast({ title: 'Success', description: 'You are logged in.' });
      navigate('/dashboard');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Auth failed', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Learnado</CardTitle>
          <CardDescription>
            {authMode === 'login' ? 'Sign in to your account' : 'Create account'}
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
                autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : authMode === 'login' ? (<><LogIn className="w-4 h-4 mr-1" />Log in</>) : (<><UserPlus className="w-4 h-4 mr-1" />Sign up</>)}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-2 text-xs">
          <div>
            {authMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button className="underline text-primary" type="button" onClick={() => setAuthMode('signup')}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="underline text-primary" type="button" onClick={() => setAuthMode('login')}>
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
