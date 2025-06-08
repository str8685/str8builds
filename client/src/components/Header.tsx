import { FC, useState, useEffect, useCallback, memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "wouter";
import { APP_NAME, APP_VERSION } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import "./scrollbar-styles.module.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  ChevronDown,
  Calendar,
  Clock,
  Cloud,
  CloudLightning,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import str8BuildLogo from "@/assets/str8-build-logo.png";

// User avatar component
interface UserAvatarProps {
  user: {
    username?: string;
    profileImageUrl?: string | null;
  } | null;
  className?: string;
}

const UserAvatar = memo(({ user, className = "" }: UserAvatarProps) => (
  <div className={`relative group ${className}`} data-oid="ve9gg_o">
    {user?.profileImageUrl ? (
      <div
        className="relative transition-transform duration-300 transform group-hover:scale-105"
        data-oid="m4ibr8j"
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-80 transition-all duration-500"
          data-oid="1hgg5iu"
        ></div>
        <img
          src={user.profileImageUrl}
          alt={user?.username || "User"}
          className="relative h-9 w-9 rounded-full object-cover ring-2 ring-cyan-400/50 group-hover:ring-cyan-300/90 transition-all duration-300 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40"
          loading="lazy"
          width={36}
          height={36}
          data-oid=":.57:.8"
        />
      </div>
    ) : (
      <div
        className="relative transition-transform duration-300 transform group-hover:scale-105"
        data-oid="9zejng7"
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-80 transition-all duration-500"
          data-oid="7_4ghbp"
        ></div>
        <div
          className="relative h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white ring-2 ring-cyan-400/50 group-hover:ring-cyan-300/90 transition-all duration-300 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40"
          data-oid="fxdi-:1"
        >
          <span className="font-bold" aria-hidden="true" data-oid="2cdyd75">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
      </div>
    )}
  </div>
));

// StarField background component
const StarField = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden opacity-30"
      data-oid="zg:bzex"
    >
      <div className="star-small" data-oid="il.sfu7"></div>
      <div className="star-medium" data-oid="0-nd2gn"></div>
      <div className="star-large" data-oid="fg07jlw"></div>

      <style jsx data-oid="0gwddis">{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .star-small,
        .star-medium,
        .star-large {
          position: absolute;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center;
        }

        .star-small {
          background-image:
            radial-gradient(
              1px 1px at 10px 10px,
              rgba(255, 255, 255, 0.7),
              transparent
            ),
            radial-gradient(
              1px 1px at 30px 50px,
              rgba(255, 255, 255, 0.5),
              transparent
            ),
            radial-gradient(
              1px 1px at 70px 120px,
              rgba(255, 255, 255, 0.6),
              transparent
            ),
            radial-gradient(
              1px 1px at 140px 90px,
              rgba(255, 255, 255, 0.5),
              transparent
            );
          background-size: 200px 200px;
          animation: twinkle 8s ease-in-out infinite;
        }

        .star-medium {
          background-image:
            radial-gradient(
              1.5px 1.5px at 25px 40px,
              rgba(150, 255, 255, 0.6),
              transparent
            ),
            radial-gradient(
              1.5px 1.5px at 100px 80px,
              rgba(150, 255, 255, 0.7),
              transparent
            ),
            radial-gradient(
              1.5px 1.5px at 200px 30px,
              rgba(150, 255, 255, 0.5),
              transparent
            );
          background-size: 300px 300px;
          animation: twinkle 10s ease-in-out infinite;
        }

        .star-large {
          background-image:
            radial-gradient(
              2px 2px at 150px 150px,
              rgba(100, 200, 255, 0.8),
              transparent
            ),
            radial-gradient(
              2px 2px at 50px 200px,
              rgba(100, 200, 255, 0.6),
              transparent
            ),
            radial-gradient(
              2px 2px at 220px 70px,
              rgba(100, 200, 255, 0.7),
              transparent
            );
          background-size: 400px 400px;
          animation:
            twinkle 12s ease-in-out infinite,
            float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Header: FC = () => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherIcon, setWeatherIcon] = useState<string>("Sun");
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      title: string;
      message: string;
      time: string;
      read: boolean;
      type: "info" | "success" | "warning" | "error";
    }>
  >([
    {
      id: "1",
      title: "New Project",
      message:
        'Your project "Kitchen Renovation" has been created successfully.',
      time: "10 min ago",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Timer Alert",
      message: "Your active timer is approaching 8 hours of work today.",
      time: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: "3",
      title: "Weather Alert",
      message: "Weather conditions changing in Wellington. Plan accordingly.",
      time: "3 hours ago",
      read: false,
      type: "info",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useIsMobile();

  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Weather icon simulation
  useEffect(() => {
    const hours = new Date().getHours();
    let selectedWeather;

    if (hours < 6 || hours > 18) {
      // Night time - cloudy or clear
      selectedWeather = Math.random() > 0.5 ? "Cloud" : "Sun";
    } else if (hours > 12 && hours < 15) {
      // Afternoon - chance of rain
      const weatherChance = Math.random();
      if (weatherChance > 0.7) {
        selectedWeather = "CloudRain";
      } else if (weatherChance > 0.4) {
        selectedWeather = "CloudDrizzle";
      } else {
        selectedWeather = "Sun";
      }
    } else {
      // Morning/Evening - various weather
      const weatherChance = Math.random();
      if (weatherChance > 0.8) {
        selectedWeather = "CloudLightning";
      } else if (weatherChance > 0.6) {
        selectedWeather = "CloudRain";
      } else if (weatherChance > 0.4) {
        selectedWeather = "Cloud";
      } else {
        selectedWeather = "Sun";
      }
    }

    setWeatherIcon(selectedWeather);
  }, []);

  // Format date and time
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  }, [logout]);

  // Map notification type to icon and color
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          icon: (
            <div className="text-green-400 font-bold" data-oid="bijj9mb">
              ✓
            </div>
          ),
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          icon: (
            <div className="text-amber-400 font-bold" data-oid="5_q0_qr">
              ⚠
            </div>
          ),
        };
      case "error":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: (
            <div className="text-red-400 font-bold" data-oid="me-ur7-">
              ×
            </div>
          ),
        };
      default:
        return {
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/30",
          icon: (
            <div className="text-cyan-400 font-bold" data-oid="2m80ne0">
              i
            </div>
          ),
        };
    }
  };

  return (
    <header
      className="relative backdrop-blur-md bg-black/60 text-white sticky top-0 z-50 border-b border-cyan-500/30 transition-all duration-500 group/header shadow-lg shadow-cyan-900/20"
      data-oid="9o8hqcm"
    >
      {/* Star field background */}
      <StarField data-oid="aravp.o" />

      {/* Header content container with glass effect */}
      <div
        className="relative px-3 md:px-4 lg:px-6 py-2 z-10 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80"
        data-oid="e3hjawv"
      >
        {/* Animated border glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform translate-y-px opacity-70 group-hover/header:opacity-100 transition-opacity duration-500"
          data-oid="015:6hr"
        ></div>
        {/* Subtle top highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-50"
          data-oid="5dxmljv"
        ></div>

        <div
          className="flex items-center justify-between max-w-screen-2xl mx-auto"
          data-oid="t30ofm_"
        >
          {/* Logo with animation */}
          <div
            className="flex items-center relative group/logo"
            data-oid="wluy:5n"
          >
            <div className="relative overflow-hidden" data-oid="o4m375y">
              {/* Logo glow effect */}
              <div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0 rounded-lg blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700"
                data-oid="bqmuou:"
              ></div>
              <div className="relative" data-oid="rb78r4d">
                <img
                  src={str8BuildLogo}
                  alt="STR8 Build"
                  className="h-9 mr-3 object-contain transition-all duration-300 group-hover/logo:scale-105 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]"
                  data-oid="hviv34g"
                />
              </div>
            </div>
            <div
              className="hidden md:flex flex-col transition-all duration-300 group-hover/logo:translate-x-1"
              data-oid="jvr_497"
            >
              <span
                className="font-bold text-lg bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-sm"
                data-oid="b3ncf4o"
              >
                {APP_NAME}
              </span>
              <span
                className="text-xs text-cyan-400/70 font-medium"
                data-oid="70qil:i"
              >
                v{APP_VERSION}
              </span>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-3" data-oid="8jzb:92">
            {/* Notification Bell */}
            <div className="relative group" data-oid="ui7-:td">
              <div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                data-oid="ccuma2d"
              ></div>
              <DropdownMenu data-oid="ff-ptoo">
                <DropdownMenuTrigger asChild data-oid="7zbdudt">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 hover:from-slate-700/90 hover:to-slate-800/90 text-cyan-100 rounded-full w-9 h-9 flex items-center justify-center border border-cyan-500/30 shadow-md shadow-cyan-900/20 transition-all duration-300 hover:shadow-cyan-700/20 hover:border-cyan-400/40 relative p-0"
                    data-oid="nvjr17x"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                      data-oid="q6w38k_"
                    ></div>
                    <Bell
                      className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                      data-oid="5f:lpec"
                    />

                    {notifications.filter((n) => !n.read).length > 0 && (
                      <span
                        className="absolute -top-0.5 -right-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-[3px] border border-cyan-400/30 shadow-sm shadow-cyan-900/50 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                        data-oid="3aahqj5"
                      >
                        {notifications.filter((n) => !n.read).length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 shadow-xl shadow-cyan-900/30 text-cyan-100 max-h-[400px] overflow-hidden"
                  data-oid="3en4t6m"
                >
                  <div
                    className="flex items-center justify-between p-3 border-b border-cyan-500/20"
                    data-oid="7y.23e."
                  >
                    <DropdownMenuLabel
                      className="text-cyan-400 mb-0 pb-0"
                      data-oid="j.5d:fn"
                    >
                      Notifications
                    </DropdownMenuLabel>
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-cyan-300 hover:text-cyan-100 bg-transparent hover:bg-cyan-800/20 h-auto py-1 px-2"
                        onClick={() => {
                          setNotifications(
                            notifications.map((n) => ({ ...n, read: true })),
                          );
                        }}
                        data-oid="b-sb.u_"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>

                  <div
                    className="max-h-[300px] overflow-y-auto"
                    data-oid="vbg0_8t"
                  >
                    {notifications.length === 0 ? (
                      <div
                        className="p-4 text-center text-gray-400"
                        data-oid="3o2vjou"
                      >
                        <p data-oid="g70owfq">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const styles = getTypeStyles(notification.type);

                        return (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-cyan-800/30 hover:bg-cyan-800/20 transition-colors duration-200 cursor-pointer ${!notification.read ? "bg-slate-800/50" : ""}`}
                            data-oid="nm99:qv"
                          >
                            <div
                              className="flex items-start gap-3"
                              data-oid="i:z1j:i"
                            >
                              <div
                                className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full ${styles.bg} ${styles.border} flex items-center justify-center`}
                                data-oid="-.w9kq5"
                              >
                                {styles.icon}
                              </div>
                              <div
                                className="flex-1 min-w-0"
                                data-oid="qojby0u"
                              >
                                <div
                                  className="flex items-start justify-between gap-2"
                                  data-oid="utte494"
                                >
                                  <h4
                                    className={`text-sm font-medium truncate ${!notification.read ? "text-cyan-100" : "text-cyan-300"}`}
                                    data-oid="7s-0kth"
                                  >
                                    {notification.title}
                                  </h4>
                                  <span
                                    className="text-xs text-gray-400 whitespace-nowrap"
                                    data-oid="iay.pv7"
                                  >
                                    {notification.time}
                                  </span>
                                </div>
                                <p
                                  className="text-xs mt-1 text-gray-400"
                                  data-oid="_y3u:u3"
                                >
                                  {notification.message}
                                </p>
                              </div>
                            </div>

                            {!notification.read && (
                              <div
                                className="flex justify-end mt-2"
                                data-oid="75q0u6s"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-cyan-400 hover:text-cyan-100 bg-transparent hover:bg-cyan-800/20 h-auto py-1 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setNotifications(
                                      notifications.map((n) =>
                                        n.id === notification.id
                                          ? { ...n, read: true }
                                          : n,
                                      ),
                                    );
                                  }}
                                  data-oid=":7ws2pv"
                                >
                                  Mark as read
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div
                    className="p-2 border-t border-cyan-500/20"
                    data-oid="k8jql1u"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-center justify-center text-sm text-cyan-400 hover:text-cyan-100 hover:bg-cyan-500/10"
                      onClick={() => {}}
                      data-oid="nr31neb"
                    >
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User menu */}
            <DropdownMenu data-oid="yqe3vfw">
              <DropdownMenuTrigger asChild data-oid="c.9y:0j">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 bg-gradient-to-br from-slate-800/80 to-slate-900/90 hover:from-slate-700/90 hover:to-slate-800/90 text-cyan-100 rounded-full px-3 py-1 border border-cyan-500/30 shadow-md shadow-cyan-900/20 transition-all duration-300 hover:shadow-cyan-700/20 hover:border-cyan-400/40"
                  data-oid="k7nwb5k"
                >
                  <UserAvatar
                    user={user as UserAvatarProps["user"]}
                    data-oid="p5at557"
                  />

                  {!isMobile && (
                    <>
                      <span
                        className="ml-2 text-sm font-medium"
                        data-oid="q9y5mp2"
                      >
                        {user?.username || "User"}
                      </span>
                      <ChevronDown
                        className="h-4 w-4 text-cyan-400"
                        data-oid="bqud0:j"
                      />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 shadow-xl shadow-cyan-900/30 text-cyan-100"
                data-oid="ul81a33"
              >
                <DropdownMenuLabel className="text-cyan-400" data-oid=".20c9b-">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator
                  className="bg-cyan-500/20"
                  data-oid="_poa:18"
                />

                <DropdownMenuItem
                  className="hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer"
                  onClick={() => {}}
                  data-oid="13yffqx"
                >
                  <User
                    className="mr-2 h-4 w-4 text-cyan-400"
                    data-oid="ki8m:.y"
                  />

                  <span data-oid="n.7xh0d">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer"
                  onClick={() => {}}
                  data-oid="b9d_c_w"
                >
                  <Settings
                    className="mr-2 h-4 w-4 text-cyan-400"
                    data-oid=".l15x.8"
                  />

                  <span data-oid="f9oiunf">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-cyan-500/10 focus:bg-cyan-500/10 cursor-pointer"
                  onClick={() => {}}
                  data-oid="rs1snec"
                >
                  <HelpCircle
                    className="mr-2 h-4 w-4 text-cyan-400"
                    data-oid="bc7p9r4"
                  />

                  <span data-oid=".om868c">Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className="bg-cyan-500/20"
                  data-oid=".im_fwt"
                />

                <DropdownMenuItem
                  className="hover:bg-red-500/10 focus:bg-red-500/10 text-red-400 cursor-pointer"
                  onClick={handleLogout}
                  data-oid="88ckud6"
                >
                  <LogOut className="mr-2 h-4 w-4" data-oid="ikgju7s" />
                  <span data-oid="i1pi4h4">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Date, Time, and Weather Section - Hidden on mobile */}
        {!isMobile && (
          <div
            className="mt-2 flex items-center justify-center space-x-4"
            data-oid="zj8j_o7"
          >
            {/* Date Display */}
            <div
              className="flex items-center space-x-2 group"
              data-oid="ze91nv8"
            >
              <div
                className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 group-hover:from-cyan-500/30 group-hover:to-blue-500/20 transition-all duration-300 shadow-sm shadow-cyan-500/10 group-hover:shadow-cyan-500/30 relative overflow-hidden"
                data-oid="i3jy8si"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  data-oid="bi0-ay-"
                ></div>
                <Calendar
                  className="h-4 w-4 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 relative z-10"
                  data-oid="wvik1vv"
                />
              </div>
              <div className="flex flex-col" data-oid="vspgtzu">
                <span
                  className="text-xs font-medium text-cyan-300/80"
                  data-oid="xnqw0.m"
                >
                  Today
                </span>
                <span
                  className="text-sm font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent"
                  data-oid="5--c50u"
                >
                  {formatDate(currentTime)}
                </span>
              </div>
            </div>

            <div
              className="w-px h-8 bg-gradient-to-b from-cyan-500/10 via-cyan-300/40 to-cyan-500/10 mx-1 group-hover:opacity-100 transition-all duration-500"
              data-oid="b64y7pn"
            ></div>

            {/* Time Display */}
            <div
              className="flex items-center space-x-2 group"
              data-oid="xsu.9xi"
            >
              <div
                className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 group-hover:from-cyan-500/30 group-hover:to-blue-500/20 transition-all duration-300 shadow-sm shadow-cyan-500/10 group-hover:shadow-cyan-500/30 relative overflow-hidden"
                data-oid="paztl7s"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  data-oid="imfp_t8"
                ></div>
                <Clock
                  className="h-4 w-4 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 relative z-10"
                  data-oid="u38l.79"
                />
              </div>
              <div className="flex flex-col" data-oid="btx:ylf">
                <span
                  className="text-xs font-medium text-cyan-300/80"
                  data-oid="yrkor5h"
                >
                  Local Time
                </span>
                <span
                  className="text-sm font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent"
                  data-oid="h5t8c7k"
                >
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>

            <div
              className="w-px h-8 bg-gradient-to-b from-cyan-500/10 via-cyan-300/40 to-cyan-500/10 mx-1 group-hover:opacity-100 transition-all duration-500"
              data-oid="g5ml3-."
            ></div>

            {/* Weather Display */}
            <div
              className="flex items-center space-x-2 group"
              data-oid="1n4pxse"
            >
              <div
                className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 group-hover:from-cyan-500/30 group-hover:to-blue-500/20 transition-all duration-300 shadow-sm shadow-cyan-500/10 group-hover:shadow-cyan-500/30 relative overflow-hidden"
                data-oid="9684mbo"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  data-oid="t-yldzz"
                ></div>
                {weatherIcon === "Sun" && (
                  <Sun className="h-4 w-4 text-yellow-300" data-oid="n3-54m9" />
                )}
                {weatherIcon === "Cloud" && (
                  <Cloud className="h-4 w-4 text-cyan-300" data-oid="ue6:32i" />
                )}
                {weatherIcon === "CloudLightning" && (
                  <CloudLightning
                    className="h-4 w-4 text-purple-300"
                    data-oid="wokbuh2"
                  />
                )}
                {weatherIcon === "CloudDrizzle" && (
                  <CloudDrizzle
                    className="h-4 w-4 text-cyan-200"
                    data-oid="s5iqcjn"
                  />
                )}
                {weatherIcon === "CloudRain" && (
                  <CloudRain
                    className="h-4 w-4 text-blue-300"
                    data-oid="wckh1d0"
                  />
                )}
                {weatherIcon === "CloudSnow" && (
                  <CloudSnow
                    className="h-4 w-4 text-white"
                    data-oid="qmilwme"
                  />
                )}
              </div>
              <div className="flex flex-col" data-oid=":0d4jkh">
                <span
                  className="text-xs font-medium text-cyan-300/80"
                  data-oid="nwud_ns"
                >
                  Weather
                </span>
                <span
                  className="text-sm font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent"
                  data-oid="x3ko8t2"
                >
                  {weatherIcon === "Sun" && "Sunny"}
                  {weatherIcon === "Cloud" && "Cloudy"}
                  {weatherIcon === "CloudLightning" && "Stormy"}
                  {weatherIcon === "CloudDrizzle" && "Drizzle"}
                  {weatherIcon === "CloudRain" && "Rainy"}
                  {weatherIcon === "CloudSnow" && "Snowy"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
