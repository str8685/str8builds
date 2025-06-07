import { FC, useState, useEffect } from "react";
import {
  Users,
  Search,
  UserPlus,
  Edit,
  Trash,
  ChevronDown,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  companyName?: string;
  role?: "admin" | "user" | "contractor";
  status?: "active" | "inactive" | "pending";
  lastActive?: string;
  createdAt?: string;
  profileImageUrl?: string | null;
}

const UserManagement: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { toast } = useToast();

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fallback mock data for development
  const mockUsers: User[] = [
    {
      id: 1,
      username: "admin",
      email: "admin@str8build.com",
      firstName: "Admin",
      lastName: "User",
      fullName: "Admin User",
      companyName: "STR8 BUILD",
      role: "admin",
      status: "active",
      lastActive: "Just now",
      createdAt: "2023-01-15",
      profileImageUrl: undefined,
    },
    {
      id: 2,
      username: "johndoe",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      fullName: "John Doe",
      companyName: "Auckland Construction",
      role: "user",
      status: "active",
      lastActive: "5 minutes ago",
      createdAt: "2023-03-10",
      profileImageUrl: undefined,
    },
    {
      id: 3,
      username: "janesmith",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      fullName: "Jane Smith",
      companyName: "Wellington Builders",
      role: "contractor",
      status: "active",
      lastActive: "2 hours ago",
      createdAt: "2023-05-22",
      profileImageUrl: null,
    },
    {
      id: 4,
      username: "bobwilson",
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Wilson",
      fullName: "Bob Wilson",
      companyName: "Christchurch Contractors",
      role: "user",
      status: "inactive",
      lastActive: "3 days ago",
      createdAt: "2023-07-05",
      profileImageUrl: null,
    },
    {
      id: 5,
      username: "newuser",
      email: "new@example.com",
      firstName: "New",
      lastName: "User",
      fullName: "New User",
      companyName: "Pending Approval",
      role: "user",
      status: "pending",
      lastActive: "Never",
      createdAt: "Today",
      profileImageUrl: null,
    },
  ];

  // Function to fetch users from API
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.users.getAll();

      if (response) {
        // Enhance user data with derived properties if needed
        const enhancedUsers = response.map((user: User) => ({
          ...user,
          // Set default values for fields that might be missing
          status: user.status || "active",
          role: user.role || "user",
          fullName:
            user.fullName ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.username,
          lastActive: user.lastActive || "Recently",
          // Format company name
          companyName: user.companyName || "Not specified",
        }));

        setUsers(enhancedUsers);
        toast({
          title: "Users loaded",
          description: `${enhancedUsers.length} users loaded successfully`,
          variant: "default",
        });
      } else {
        // Fall back to mock data
        console.log("No users found from API, using mock data");
        setUsers(mockUsers);
        toast({
          title: "Development Mode",
          description: `Using mock data (${mockUsers.length} users)`,
          variant: "default",
        });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      // Fall back to mock data
      console.log("Error fetching users from API, using mock data");
      setUsers(mockUsers);
      toast({
        title: "Development Mode",
        description: "Using mock data while API is unavailable",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle real-time user updates
  useEffect(() => {
    // This could be implemented with WebSockets or other real-time technologies
    const pollingInterval = setInterval(() => {
      // Only poll when page is visible
      if (document.visibilityState === "visible" && !isLoading) {
        fetchUsers();
      }
    }, 60000); // Poll every minute

    return () => clearInterval(pollingInterval);
  }, [isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companyName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const refreshUsers = () => {
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsLoading(true);

      try {
        await api.users.delete(id);
        setUsers(users.filter((user) => user.id !== id));
        toast({
          title: "User deleted",
          description: "User has been removed successfully",
          variant: "default",
        });
      } catch (err) {
        console.error("Error deleting user:", err);
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getRoleColor = (role: string = "user") => {
    switch (role) {
      case "admin":
        return "bg-purple-900 text-purple-300";
      case "contractor":
        return "bg-blue-900 text-blue-300";
      default:
        return "bg-space-800 text-cyan";
    }
  };

  const getStatusColor = (status: string = "active") => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "inactive":
        return "text-gray-400";
      case "pending":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string = "active") => {
    switch (status) {
      case "active":
        return (
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="jndgok_" />
        );

      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-400" data-oid=":lh8qmf" />;
      case "pending":
        return (
          <RefreshCw className="h-4 w-4 text-orange-400" data-oid=".v5f5ep" />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" data-oid="ab7vwu6">
      <div
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        data-oid="lax:div"
      >
        <h2
          className="text-xl font-bold text-white flex items-center"
          data-oid="6vmpykd"
        >
          <Users className="h-5 w-5 mr-2 text-cyan" data-oid="pb1bqxu" />
          User Management
        </h2>

        <div className="flex flex-col md:flex-row gap-3" data-oid="ybb9z1c">
          <div className="relative" data-oid="z-fd-4:">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 bg-space-800 border border-gray-700 rounded-lg text-white"
              value={searchTerm}
              onChange={handleSearch}
              data-oid="1::qke:"
            />

            <Search
              className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
              data-oid="2yqctvk"
            />
          </div>

          <div className="flex gap-2" data-oid="dx52mo7">
            <div className="relative" data-oid="s0_3yvv">
              <select
                className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                data-oid="ce1u-6d"
              >
                <option value="" data-oid="brb_74:">
                  All Roles
                </option>
                <option value="admin" data-oid="0de51om">
                  Admin
                </option>
                <option value="user" data-oid="v3uflgr">
                  User
                </option>
                <option value="contractor" data-oid="j26ui.u">
                  Contractor
                </option>
              </select>
              <ChevronDown
                className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
                data-oid="9.bmekl"
              />
            </div>

            <div className="relative" data-oid="2uuo4uw">
              <select
                className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                data-oid="uxksoqg"
              >
                <option value="" data-oid="soaqasg">
                  All Status
                </option>
                <option value="active" data-oid=".u:a:nr">
                  Active
                </option>
                <option value="inactive" data-oid="euq5fph">
                  Inactive
                </option>
                <option value="pending" data-oid="f70bbc-">
                  Pending
                </option>
              </select>
              <ChevronDown
                className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
                data-oid="yt0qk3f"
              />
            </div>

            <button
              className="btn-glow btn-glow-cyan bg-purple-900 text-cyan px-3 py-2 rounded-lg flex items-center"
              onClick={() => setShowAddModal(true)}
              data-oid="5-05aua"
            >
              <UserPlus className="h-4 w-4 mr-1.5" data-oid="q_rcv3x" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="bg-space-900 rounded-xl overflow-hidden glass-card"
        data-oid="bmue0ii"
      >
        <div className="overflow-x-auto" data-oid="bnn1ieu">
          <table className="w-full" data-oid="_yrtp43">
            <thead data-oid="962lp.a">
              <tr
                className="bg-space-800 border-b border-gray-700"
                data-oid="u19eihq"
              >
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="fvo6a2k"
                >
                  User
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="l-gl1vp"
                >
                  Company
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="y8zrrh9"
                >
                  Role
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="v27ph2w"
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="u1qe25p"
                >
                  Last Active
                </th>
                <th
                  className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="s9ha8ah"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800" data-oid="hkhrzyb">
              {isLoading ? (
                <tr data-oid="q60qb2b">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                    data-oid="y0k0dy7"
                  >
                    <RefreshCw
                      className="h-6 w-6 mx-auto animate-spin mb-2"
                      data-oid="pz.89u-"
                    />
                    Loading users...
                  </td>
                </tr>
              ) : error ? (
                <tr data-oid="vvmkscv">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                    data-oid="ng_.hie"
                  >
                    <AlertTriangle
                      className="h-6 w-6 mx-auto text-orange-400 mb-2"
                      data-oid="0ht-v.f"
                    />

                    {error}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr data-oid="-sw9cd:">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                    data-oid="0dl0azf"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-space-800/50"
                    data-oid="pfa6au."
                  >
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="wg40u2p"
                    >
                      <div className="flex items-center" data-oid=":aiy4kc">
                        <div
                          className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white"
                          data-oid="kik7.9x"
                        >
                          {(user.fullName || user.username || "?")
                            .substring(0, 1)
                            .toUpperCase()}
                        </div>
                        <div className="ml-3" data-oid="p08mzcv">
                          <p
                            className="text-sm font-medium text-white"
                            data-oid="3s2cqf1"
                          >
                            {user.fullName || user.username}
                          </p>
                          <p
                            className="text-xs text-gray-400"
                            data-oid="mgg70-p"
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="j05414o"
                    >
                      <span
                        className="text-sm text-gray-300"
                        data-oid="m_.ap9q"
                      >
                        {user.companyName || "Not specified"}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="k2alhy9"
                    >
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(user.role)}`}
                        data-oid="ov7::e-"
                      >
                        {user.role === "admin" && (
                          <Shield
                            className="h-3 w-3 inline mr-1"
                            data-oid="ddpym1v"
                          />
                        )}
                        {(user.role || "user").charAt(0).toUpperCase() +
                          (user.role || "user").slice(1)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="i:zzvo4"
                    >
                      <span
                        className={`text-sm flex items-center ${getStatusColor(user.status)}`}
                        data-oid="id3veoj"
                      >
                        {getStatusIcon(user.status)}
                        <span className="ml-1.5" data-oid="-iv09:u">
                          {(user.status || "active").charAt(0).toUpperCase() +
                            (user.status || "active").slice(1)}
                        </span>
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-400"
                      data-oid="b3y.v6c"
                    >
                      {user.lastActive || "Unknown"}
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
                      data-oid="k5:ngzw"
                    >
                      <div
                        className="flex justify-end space-x-2"
                        data-oid="ob08qhz"
                      >
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-blue-400 hover:bg-space-700 transition-colors"
                          data-oid="xykpsr0"
                        >
                          <Edit className="h-4 w-4" data-oid="7k90xpe" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-red-400 hover:bg-space-700 transition-colors"
                          onClick={() => deleteUser(user.id)}
                          data-oid="3gx.:xc"
                        >
                          <Trash className="h-4 w-4" data-oid="sp_x--8" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-gray-400 hover:bg-space-700 transition-colors"
                          data-oid="cowu786"
                        >
                          <Settings className="h-4 w-4" data-oid="tgq5br-" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          className="bg-space-800 px-4 py-3 flex justify-between items-center border-t border-gray-700"
          data-oid="..yhge0"
        >
          <div className="text-sm text-gray-400" data-oid="p91c6-u">
            Showing{" "}
            <span className="font-medium text-white" data-oid="i3z2tie">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-white" data-oid="4n5rq61">
              {users.length}
            </span>{" "}
            users
          </div>

          <button
            className="text-sm text-cyan flex items-center"
            onClick={refreshUsers}
            disabled={isLoading}
            data-oid="4ma7-s."
          >
            {isLoading ? (
              <>
                <RefreshCw
                  className="h-4 w-4 mr-1.5 animate-spin"
                  data-oid="tt21wcp"
                />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5" data-oid="g7tbwk5" />
                Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* Help text */}
      <div
        className="p-4 bg-space-800/70 rounded-lg border border-gray-700"
        data-oid="w1zde:u"
      >
        <div className="flex" data-oid="8bi5zu5">
          <div className="flex-shrink-0" data-oid="3vh983i">
            <Shield className="h-5 w-5 text-cyan" data-oid="4th_9yd" />
          </div>
          <div className="ml-3" data-oid="-lak40i">
            <h3 className="text-sm font-medium text-white" data-oid="es0rx3c">
              User Management
            </h3>
            <p className="mt-1 text-sm text-gray-400" data-oid="w8dj340">
              Add, edit, and manage user accounts. Assign roles to control
              access levels within the application. Admins have full access,
              users have standard access, and contractors have limited access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
