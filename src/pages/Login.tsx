import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-slate-800 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-violet-500 flex items-center justify-center">
                <Lock className="text-white h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-center text-xl">Sign in</CardTitle>
            <CardDescription className="text-center">
              Login as <span className="font-medium">User</span> or{" "}
              <span className="font-medium">Admin</span> based on your role.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <motion.p
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Email
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-slate-900/80 border-slate-700 text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-slate-900/80 border-slate-700 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
