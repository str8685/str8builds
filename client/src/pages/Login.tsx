import { FC, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
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
import { LucideLoader2, User, Lock, ChevronRight } from "lucide-react";
import str8BuildLogo from "@/assets/str8-build-logo.png";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import InstallPrompt from "../components/ui/InstallPrompt";
import { motion, AnimatePresence } from "framer-motion";

// Define login form schema
const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Clean login handler - uses only API authentication
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const trimmedUsername = data.username.trim();
      console.log("Login attempt with username:", trimmedUsername);

      // Use the standard API login
      await login(trimmedUsername, data.password);

      // Success message for API login
      toast({
        title: "Login successful",
        description: "Welcome to STR8 BUILD!",
        duration: 2000,
      });

      // Redirect to dashboard after a small delay
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } catch (error: any) {
      console.error("Login process failed:", error);

      // Reset loading state
      setIsLoading(false);

      // Show appropriate error message
      let errorMessage = "Invalid credentials";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.toString) {
        errorMessage = error.toString();
      }

      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
        duration: 3000,
      });
    }
  };

  // Animation variants for elements
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      filter: "drop-shadow(0 0 40px rgba(34,211,238,0.9))",
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  // Subtle background animation
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setBgPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating stars background effect
  const starCount = 50;
  const stars = Array.from({ length: starCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDuration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgb(8, 13, 24) 0%, rgb(16, 21, 40) 100%)`,
      }}
      data-oid="k1u.66b"
    >
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden" data-oid="rz9i4nq">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.size > 2 ? 0.8 : 0.5,
              boxShadow:
                star.size > 2
                  ? `0 0 ${star.size * 3}px rgba(134, 228, 246, 0.8)`
                  : "none",
              animation: `pulse ${star.animationDuration}s ease-in-out infinite ${star.delay}s`,
            }}
            data-oid="5afw4hb"
          />
        ))}
      </div>

      {/* Main content container */}
      <div
        className="relative min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)`,
          backgroundPosition: `${50 + bgPosition.x}% ${50 + bgPosition.y}%`,
          transition: "background-position 0.5s ease-out",
        }}
        data-oid="v3tcg2g"
      >
        <InstallPrompt forceShow={true} data-oid="0ym_ne5" />
        <div className="sm:mx-auto sm:w-full sm:max-w-md" data-oid="132-pt.">
          {/* PWA Install Prompt */}
          <PWAInstallPrompt data-oid="nrk_9dj" />

          {/* Enhanced Logo Section with advanced animations */}
          <motion.div
            className="mb-10 text-center"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            data-oid="e4u_izr"
          >
            <motion.div
              className="relative inline-block"
              variants={logoVariants}
              data-oid="58s4fqo"
            >
              <motion.img
                src={str8BuildLogo}
                alt="STR8 BUILD Logo"
                className="w-64 h-auto mx-auto"
                style={{ filter: "drop-shadow(0 0 25px rgba(34,211,238,0.6))" }}
                data-oid="c_6qj4o"
              />

              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-2xl -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                data-oid="r8:pk37"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-3 text-lg font-medium"
              style={{
                color: "#22d3ee",
                textShadow: "0 0 10px rgba(34,211,238,0.3)",
              }}
              data-oid="7bibp10"
            >
              <span className="tracking-wider" data-oid="njpudil">
                PROFESSIONAL CONSTRUCTION MANAGEMENT
              </span>
            </motion.p>
          </motion.div>

          {/* Enhanced Login Card with professional styling */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative"
            data-oid="mawxqzl"
          >
            {/* Card glow effect */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-blue-500/20 to-purple-600/20 rounded-xl blur-xl opacity-70"
              data-oid="s3.qrlm"
            ></div>

            <Card
              className="relative w-full max-w-md overflow-hidden rounded-xl border-0 shadow-2xl"
              data-oid="7yj0jd3"
            >
              {/* Glass panel design */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-space-900/90 via-space-800/90 to-space-900/90 backdrop-blur-md border border-cyan-500/10 rounded-xl z-0"
                data-oid="v9u97p1"
              ></div>

              {/* Card content */}
              <CardHeader
                className="relative z-10 border-b border-space-700/50 bg-gradient-to-r from-space-900/70 to-space-800/70 pb-6"
                data-oid="os.nr_q"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400"
                  data-oid="7s8g7cf"
                ></div>

                <CardTitle
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 text-center drop-shadow-lg"
                  data-oid="e0mjsz."
                >
                  Welcome Back
                </CardTitle>
                <CardDescription
                  className="text-gray-300 text-center mt-1"
                  data-oid="1eu8x6k"
                >
                  Sign in to your {APP_NAME} account
                </CardDescription>
              </CardHeader>

              <CardContent
                className="relative z-10 p-8 pt-8"
                data-oid="ku-jq67"
              >
                <Form {...form} data-oid="2194q4e">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    data-oid="t0bzx5d"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="space-y-3" data-oid="eyof:00">
                          <FormLabel
                            className="text-cyan-100 font-medium flex items-center gap-2"
                            data-oid="cj5h2:n"
                          >
                            <User
                              size={16}
                              className="text-cyan-400"
                              data-oid="_uuca2a"
                            />
                            Username
                          </FormLabel>
                          <FormControl data-oid=".j0hzko">
                            <div className="relative group" data-oid=".wns4vc">
                              <Input
                                {...field}
                                className="bg-space-800/50 border-space-600 text-white h-12 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-cyan-500/70 focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
                                placeholder="Enter your username"
                                data-oid="cyf8lt5"
                              />

                              <div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-blue-500/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                                data-oid="ekfk-8w"
                              ></div>
                            </div>
                          </FormControl>
                          <FormMessage
                            className="text-rose-400 text-xs"
                            data-oid="w4.fpde"
                          />
                        </FormItem>
                      )}
                      data-oid="jps3w2x"
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-3" data-oid="36sb3i4">
                          <FormLabel
                            className="text-cyan-100 font-medium flex items-center gap-2"
                            data-oid=":qjhgap"
                          >
                            <Lock
                              size={16}
                              className="text-cyan-400"
                              data-oid="978k6oh"
                            />
                            Password
                          </FormLabel>
                          <FormControl data-oid=".yq3q-v">
                            <div className="relative group" data-oid="amxkc0d">
                              <Input
                                type="password"
                                {...field}
                                className="bg-space-800/50 border-space-600 text-white h-12 pl-4 pr-10 rounded-lg focus:ring-2 focus:ring-cyan-500/70 focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
                                placeholder="Enter your password"
                                data-oid="0flylt-"
                              />

                              <div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-blue-500/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                                data-oid="j7yx0-g"
                              ></div>
                            </div>
                          </FormControl>
                          <FormMessage
                            className="text-rose-400 text-xs"
                            data-oid="xklt53e"
                          />
                        </FormItem>
                      )}
                      data-oid="c_.fmvw"
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-2"
                      data-oid="rpu5u8p"
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 mt-2 relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium text-lg rounded-lg transition-all duration-300 group"
                        disabled={isLoading}
                        data-oid="1mw_8k4"
                      >
                        {/* Button hover effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                          data-oid="5_tnt8g"
                        ></div>

                        {/* Button content */}
                        <div
                          className="relative flex items-center justify-center gap-2"
                          data-oid="gdhxaxk"
                        >
                          {isLoading ? (
                            <LucideLoader2
                              className="h-5 w-5 animate-spin text-white"
                              data-oid="ruqjijs"
                            />
                          ) : (
                            <>
                              <span data-oid="umf33lm">Sign In</span>
                              <ChevronRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform duration-300"
                                data-oid="lzkibpb"
                              />
                            </>
                          )}
                        </div>

                        {/* Button glow */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                          data-oid="92md:zp"
                        ></div>
                      </Button>
                    </motion.div>
                  </form>
                </Form>

                <div className="mt-8 text-center" data-oid="l63kghc">
                  <div
                    className="relative flex items-center justify-center"
                    data-oid="1271do8"
                  >
                    <div
                      className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                      data-oid="j_qm5o-"
                    ></div>
                  </div>

                  <p className="mt-6 text-sm text-gray-300" data-oid="1:m0j78">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="relative inline-block group"
                      data-oid="z2nrg10"
                    >
                      <span
                        className="text-cyan-400 font-medium transition-colors group-hover:text-cyan-300"
                        data-oid="mp:a_lr"
                      >
                        Create Account
                      </span>
                      <span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"
                        data-oid="abrxve6"
                      ></span>
                    </Link>
                  </p>
                </div>
              </CardContent>

              <CardFooter
                className="relative z-10 flex justify-center text-xs text-gray-400 bg-space-800/60 py-4 border-t border-gray-800/50"
                data-oid="4o9yk6b"
              >
                <span className="opacity-70" data-oid="::gd-cd">
                  &copy; {new Date().getFullYear()} STR8 BUILD Ltd. All rights
                  reserved.
                </span>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
