'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import myAxios from '@/lib/axios.config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: [], password: [] });
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if session exists
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await myAxios.post('/auth/checkCredentials', authState);

      if (res.status === 200) {
        const result = await signIn('credentials', {
          email: authState.email,
          password: authState.password,
          redirect: false,
        });

        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success('Login Successful');
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 401) {
        toast.error('Invalid Credentials');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  // Show a loading state if session status is being determined
  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  // Only show login form if unauthenticated
  if (status === 'unauthenticated') {
    return (
      <div>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Welcome to Asian College of Higher Studies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={authState.email}
                    onChange={(e) =>
                      setAuthState({ ...authState, email: e.target.value })
                    }
                  />
                  <span className="text-red-400">{errors.email?.[0]}</span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={authState.password}
                    onChange={(e) =>
                      setAuthState({ ...authState, password: e.target.value })
                    }
                  />
                  <span className="text-red-400">{errors.password?.[0]}</span>
                </div>
                <div className="mt-2">
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Processing' : 'Login'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    );
  }

  return null; // Render nothing if authenticated to prevent login page flicker
};

export default Login;
