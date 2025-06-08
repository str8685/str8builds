import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { APP_NAME } from "@/lib/constants";
import { LucideLoader2 } from "lucide-react";
import str8BuildLogo from "@/assets/str8-build-logo.png";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { motion } from "framer-motion";
import InstallPrompt from "../components/ui/InstallPrompt";

// Define registration form schema
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: FC = () => {
  const { register } = useAuth();
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(data.username, data.email, data.password);
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });

      // Redirect to login page
      setLocation("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description:
          error?.message || "There was a problem creating your account",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4"
      data-oid="ygx:_9j"
    >
      <InstallPrompt forceShow={true} data-oid="s5454ip" />
      {/* PWA Install Prompt */}
      <PWAInstallPrompt data-oid="s48irlm" />

      {/* Enhanced Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
        data-oid="je4rzbg"
      >
        <div className="relative inline-block" data-oid="nl14nnb">
          <img
            src={str8BuildLogo}
            alt="STR8 BUILD Logo"
            className="w-64 h-auto mx-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] transition-all duration-500 transform hover:scale-105"
            data-oid="e6l3y.b"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl -z-10"
            data-oid="lb5qfsd"
          ></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-3xl font-bold text-white tracking-wide"
          data-oid="fh:f5j8"
        >
          STR8 BUILD
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 text-lg text-cyan-300 font-medium"
          data-oid="65ldxgl"
        >
          Professional Construction Management
        </motion.p>
      </motion.div>

      {/* Enhanced Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        data-oid="fond134"
      >
        <Card
          className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg border-gray-700/50 shadow-2xl overflow-hidden ring-1 ring-cyan-500/20"
          data-oid="3org8g."
        >
          <CardHeader
            className="border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80"
            data-oid="gf8xi5:"
          >
            <CardTitle
              className="text-2xl font-bold text-cyan-400 text-center"
              data-oid="dot8bo:"
            >
              Create Account
            </CardTitle>
            <CardDescription
              className="text-gray-300 text-center"
              data-oid="yf3jpui"
            >
              Join {APP_NAME} today
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8" data-oid="je6a6j-">
            <Form {...form} data-oid="ujsnutw">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                data-oid="vxh:uue"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem data-oid="j7x4jcf">
                      <FormLabel
                        className="text-gray-300 font-medium"
                        data-oid="ctwd:o_"
                      >
                        Username
                      </FormLabel>
                      <FormControl data-oid="kcleogf">
                        <Input
                          placeholder="Choose a username"
                          {...field}
                          className="bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-11 text-base"
                          data-oid="whkqdn."
                        />
                      </FormControl>
                      <FormMessage
                        className="text-rose-400"
                        data-oid="u..c-ee"
                      />
                    </FormItem>
                  )}
                  data-oid="a9qrsjt"
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem data-oid="5i:3vo9">
                      <FormLabel
                        className="text-gray-300 font-medium"
                        data-oid="5v7ry.:"
                      >
                        Email
                      </FormLabel>
                      <FormControl data-oid="w95z_zi">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-11 text-base"
                          data-oid="ml.otng"
                        />
                      </FormControl>
                      <FormMessage
                        className="text-rose-400"
                        data-oid="61t-.0."
                      />
                    </FormItem>
                  )}
                  data-oid="n7svfj."
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem data-oid="waui_k2">
                      <FormLabel
                        className="text-gray-300 font-medium"
                        data-oid="g7ipel3"
                      >
                        Password
                      </FormLabel>
                      <FormControl data-oid="y2nog8q">
                        <Input
                          type="password"
                          placeholder="Create a password"
                          {...field}
                          className="bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-11 text-base"
                          data-oid="6w.g.u-"
                        />
                      </FormControl>
                      <FormMessage
                        className="text-rose-400"
                        data-oid="tb04blg"
                      />
                    </FormItem>
                  )}
                  data-oid="nwikovi"
                />

                {form.watch("password") && (
                  <div className="pt-2" data-oid=":4f4hvs">
                    <div
                      className="h-1 bg-gray-700 rounded-full overflow-hidden"
                      data-oid=":6dmglz"
                    >
                      <div
                        className={`h-full transition-all duration-300 ${form.watch("password").length >= 8 ? "bg-green-500" : "bg-yellow-500"}`}
                        style={{
                          width: `${Math.min(100, form.watch("password").length * 10)}%`,
                        }}
                        data-oid="vkv7twh"
                      />
                    </div>
                    <p
                      className="text-xs text-gray-400 mt-1"
                      data-oid="mta_mno"
                    >
                      Password strength:{" "}
                      {form.watch("password").length >= 8 ? "Strong" : "Weak"}
                    </p>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem data-oid="67snqm:">
                      <FormLabel
                        className="text-gray-300 font-medium"
                        data-oid="d6s2c8x"
                      >
                        Confirm Password
                      </FormLabel>
                      <FormControl data-oid="6hddqsv">
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                          className="bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-11 text-base"
                          data-oid="ak5uwj7"
                        />
                      </FormControl>
                      <FormMessage
                        className="text-rose-400"
                        data-oid="j2927e4"
                      />
                    </FormItem>
                  )}
                  data-oid="vaayxs8"
                />

                <Button
                  type="submit"
                  className="w-full h-12 mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:scale-[1.02]"
                  disabled={isLoading}
                  data-oid="682921m"
                >
                  {isLoading ? (
                    <LucideLoader2
                      className="mr-2 h-5 w-5 animate-spin"
                      data-oid="4ppfk_n"
                    />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center" data-oid="aujjevn">
              <Separator className="my-6 bg-gray-600" data-oid="5a5zzaj" />
              <p className="text-sm text-gray-400" data-oid="8ib392-">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  data-oid="up_i1o1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter
            className="flex justify-center text-xs text-gray-500 bg-gray-800/40 py-4"
            data-oid="i3_z032"
          >
            &copy; {new Date().getFullYear()} STR8 BUILD Ltd. All rights
            reserved.
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
