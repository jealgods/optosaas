"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - no actual authentication
    console.log("Login attempt:", { username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Staff Login</h2>
      </div>

      <div>
        <Label htmlFor="username">Username *</Label>
        <div className="mt-1">
          <Input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full"
            aria-describedby="username-desc"
            autoComplete="username"
          />
          <p id="username-desc" className="sr-only">
            Enter your staff username to log in
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password *</Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full"
            aria-describedby="password-desc"
            autoComplete="current-password"
          />
          <p id="password-desc" className="sr-only">
            Enter your staff password to log in
          </p>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" aria-label="Login to staff dashboard">
          LOGIN
        </Button>
      </div>

      <div className="text-center">
        <Button
          variant="link"
          type="button"
          className="text-sm text-primary hover:text-primary/80 p-0 h-auto"
          onClick={() => console.log('Forgot password clicked')}
          aria-label="Reset your password"
        >
          Forgot Password?
        </Button>
      </div>
    </form>
  );
}