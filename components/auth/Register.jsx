'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import myAxios from '@/lib/axios.config';

import { toast } from 'react-toastify';
const Register = () => {
  const [authState, setAuthState] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    myAxios
      .post('/auth/register', authState) // Use '/auth/register' if this is for registration
      .then((res) => {
        setLoading(false);
        toast.success('Account Created Successfully');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response?.data.errors);
        } else {
          toast.error('Something went wrong');
        }
      });
  };
  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register to Asian College of Higher Studies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={authState.name}
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                />
                <span className="text-red-400">{errors.name?.[0]}</span>
              </div>
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
                    setAuthState({
                      ...authState,
                      password: e.target.value,
                    })
                  }
                />
                <span className="text-red-400">{errors.password?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  value={authState.password_confirmation}
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: e.target.value,
                    })
                  }
                />
                <span className="text-red-400">
                  {errors.password_confirmation?.[0]}
                </span>
              </div>
              <div className="mt-2">
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Processing' : 'Register'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Register;
