
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Target, LogIn } from 'lucide-react';

const AuthPage = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Life Tracker
          </CardTitle>
          <p className="text-gray-600">
            Track your daily progress and build better habits with personalized insights.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Loading...' : 'Continue with Google'}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Secure authentication powered by Supabase</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">✨ What you'll get:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Personal dashboard with insights</li>
              <li>• Daily habit tracking</li>
              <li>• Progress trends and analytics</li>
              <li>• Secure cloud data storage</li>
              <li>• Access from any device</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
