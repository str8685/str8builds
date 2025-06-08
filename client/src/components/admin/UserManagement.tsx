import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
  User,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Lock,
  ArrowUpDown,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Sample user data - in a real app, this would come from your API
// No sample users - wait for API data
const sampleUsers: any[] = [];

const UserManagement: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    (typeof sampleUsers)[0] | null
  >(null);

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "All" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4" data-oid="ra7satm">
      <div className="flex justify-between items-center" data-oid="4kmqn29">
        <h3 className="text-xl font-bold text-white" data-oid="ifonn.r">
          User Management
        </h3>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-purple-900 text-cyan hover:bg-purple-800 btn-glow btn-glow-cyan"
          data-oid="4.7b.vb"
        >
          <UserPlus className="h-4 w-4 mr-2" data-oid="-_6:xx:" />
          Add User
        </Button>
      </div>

      {/* Filters and search */}
      <GlassCard className="p-4" data-oid="f3j_3uq">
        <div className="flex flex-col md:flex-row gap-4" data-oid="s8yhjgx">
          <div className="relative flex-grow" data-oid="-naj6fu">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              data-oid="mhomwg1"
            />

            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-space-900 border-gray-700 text-white"
              data-oid=".jgs37k"
            />
          </div>

          <div className="flex flex-wrap gap-2" data-oid="5v.5h5q">
            <div
              className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
              data-oid="fsdli5v"
            >
              <Filter
                className="h-4 w-4 text-gray-400 mr-2"
                data-oid="u05-mk6"
              />

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
                data-oid="bfnyi76"
              >
                <option value="All" data-oid="h001znm">
                  All Roles
                </option>
                <option value="Admin" data-oid="3r1gcpl">
                  Admin
                </option>
                <option value="Manager" data-oid="_iaip5b">
                  Manager
                </option>
                <option value="User" data-oid="pivb:v5">
                  User
                </option>
              </select>
            </div>

            <div
              className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
              data-oid="0cykj:j"
            >
              <Filter
                className="h-4 w-4 text-gray-400 mr-2"
                data-oid="jku2j_8"
              />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
                data-oid="c26w2cs"
              >
                <option value="All" data-oid="1190wdt">
                  All Status
                </option>
                <option value="Active" data-oid=".tdibgb">
                  Active
                </option>
                <option value="Inactive" data-oid="iv8ji.:">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Users table */}
      <GlassCard className="p-0 overflow-hidden" data-oid="lj5enhq">
        <div className="overflow-x-auto" data-oid="ceagb8w">
          <table className="w-full text-left" data-oid="alelpmk">
            <thead
              className="bg-space-900 text-gray-300 text-sm"
              data-oid="_e467ka"
            >
              <tr data-oid="tc2avqh">
                <th
                  className="px-4 py-3 font-medium flex items-center"
                  data-oid="unz4o9w"
                >
                  <User className="h-4 w-4 mr-2" data-oid="p0:jxtw" />
                  Name
                  <ArrowUpDown className="h-3 w-3 ml-1" data-oid="4exdux_" />
                </th>
                <th className="px-4 py-3 font-medium" data-oid="h0xyk2p">
                  Email
                </th>
                <th className="px-4 py-3 font-medium" data-oid="pfmu71l">
                  Role
                </th>
                <th className="px-4 py-3 font-medium" data-oid="5qf02pc">
                  Status
                </th>
                <th className="px-4 py-3 font-medium" data-oid="h765psz">
                  Subscription
                </th>
                <th className="px-4 py-3 font-medium" data-oid="537v99w">
                  Registered
                </th>
                <th className="px-4 py-3 font-medium" data-oid="6q5j-tg">
                  Last Login
                </th>
                <th
                  className="px-4 py-3 font-medium text-right"
                  data-oid="v5je5zo"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-800 text-white"
              data-oid="gm9srht"
            >
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-space-900/50"
                  data-oid="jhuvb38"
                >
                  <td className="px-4 py-3 text-cyan" data-oid="639hqpb">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-300" data-oid="_t5e-lf">
                    {user.email}
                  </td>
                  <td className="px-4 py-3" data-oid="wecocgn">
                    {user.role === "Admin" && (
                      <Badge
                        className="bg-purple-900 text-cyan"
                        data-oid="50iv83x"
                      >
                        <Shield className="h-3 w-3 mr-1" data-oid="wy.1br3" />
                        Admin
                      </Badge>
                    )}
                    {user.role === "Manager" && (
                      <Badge
                        className="bg-blue-900 text-blue-300"
                        data-oid="3h2w-2q"
                      >
                        Manager
                      </Badge>
                    )}
                    {user.role === "User" && (
                      <Badge
                        className="bg-gray-700 text-gray-300"
                        data-oid="3u4gowk"
                      >
                        User
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3" data-oid="cuw3fnu">
                    {user.status === "Active" ? (
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="93aeugh"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-red-900 text-red-300"
                        data-oid="xmsocxd"
                      >
                        Inactive
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3" data-oid="cix.l0-">
                    {user.subscription === "Pro" ? (
                      <Badge
                        className="bg-teal-900 text-teal-300"
                        data-oid="xo2p6zj"
                      >
                        Pro
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-blue-900 text-blue-300"
                        data-oid="v6:7lnr"
                      >
                        Basic
                      </Badge>
                    )}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-400 text-sm"
                    data-oid="ka..ivo"
                  >
                    {formatDate(user.registrationDate)}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-400 text-sm"
                    data-oid="v.8r91d"
                  >
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-4 py-3 text-right" data-oid="9l-73o9">
                    <div
                      className="flex justify-end space-x-2"
                      data-oid="5o_b0z9"
                    >
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1 text-gray-400 hover:text-cyan rounded"
                        data-oid="6uq9io."
                      >
                        <Edit className="h-4 w-4" data-oid="ow5q9h:" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-400 rounded"
                        data-oid="o1c97ia"
                      >
                        <Trash2 className="h-4 w-4" data-oid="vrc9ux-" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400" data-oid=":nf7m_c">
            No users found matching your filters.
          </div>
        )}

        <div
          className="bg-space-900 px-4 py-3 flex items-center justify-between"
          data-oid="5b17hs-"
        >
          <div className="text-sm text-gray-400" data-oid="ew22ff1">
            Showing {filteredUsers.length} of {sampleUsers.length} users
          </div>
          <div className="flex space-x-1" data-oid="07wezer">
            <Button
              variant="outline"
              size="sm"
              className="bg-space-800 border-gray-700 text-gray-300"
              data-oid="4:56i7j"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-space-800 border-gray-700 text-gray-300"
              data-oid="woo3p0x"
            >
              Next
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Add User Dialog */}
      <Dialog
        open={showAddUser}
        onOpenChange={setShowAddUser}
        data-oid=":klnerx"
      >
        <DialogContent
          className="bg-space-900 border border-gray-700"
          data-oid=".rgduil"
        >
          <DialogHeader data-oid="uvwps:0">
            <DialogTitle className="text-white" data-oid="4rirv_w">
              Add New User
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4" data-oid=".5jc9es">
            <div className="grid grid-cols-2 gap-4" data-oid="k4yk1f8">
              <div className="space-y-2" data-oid="8e1q.2c">
                <label className="text-sm text-gray-400" data-oid="slw4.v2">
                  First Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  placeholder="John"
                  data-oid="7snsegr"
                />
              </div>
              <div className="space-y-2" data-oid="4ab32id">
                <label className="text-sm text-gray-400" data-oid="_1dst48">
                  Last Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  placeholder="Smith"
                  data-oid="jobq0hl"
                />
              </div>
            </div>

            <div className="space-y-2" data-oid=".7hzgsq">
              <label className="text-sm text-gray-400" data-oid="fjc52yi">
                Email
              </label>
              <div className="relative" data-oid="z8uvaxw">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid="g5mlcoo"
                />

                <Input
                  className="bg-space-800 border-gray-700 text-white pl-10"
                  placeholder="user@example.com"
                  data-oid="m0j275r"
                />
              </div>
            </div>

            <div className="space-y-2" data-oid="83l6tbv">
              <label className="text-sm text-gray-400" data-oid="o9-7sje">
                Password
              </label>
              <div className="relative" data-oid="tiuqo03">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid=".3l7ek3"
                />

                <Input
                  type="password"
                  className="bg-space-800 border-gray-700 text-white pl-10"
                  placeholder="Set a secure password"
                  data-oid="v39:fuh"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" data-oid="jrj__ou">
              <div className="space-y-2" data-oid="8f._j_u">
                <label className="text-sm text-gray-400" data-oid="d1pfp19">
                  Role
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="0tvrdr4"
                >
                  <option value="Admin" data-oid="baq2gfb">
                    Admin
                  </option>
                  <option value="Manager" data-oid="fyvunwo">
                    Manager
                  </option>
                  <option value="User" selected data-oid="hx1j4i8">
                    User
                  </option>
                </select>
              </div>
              <div className="space-y-2" data-oid="xh181mt">
                <label className="text-sm text-gray-400" data-oid="0_0_w83">
                  Subscription
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="xiry0h7"
                >
                  <option value="Free" data-oid="9krj-y2">
                    Free
                  </option>
                  <option value="Basic" data-oid="rie.mtc">
                    Basic
                  </option>
                  <option value="Pro" data-oid=":g9vi4c">
                    Professional
                  </option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter data-oid="8x13xbh">
            <Button
              variant="ghost"
              onClick={() => setShowAddUser(false)}
              className="text-gray-300 hover:text-white hover:bg-space-800"
              data-oid="37mo0iu"
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-900 text-cyan hover:bg-purple-800"
              onClick={() => setShowAddUser(false)}
              data-oid="ba--xer"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        data-oid="0m_x:4f"
      >
        {selectedUser && (
          <DialogContent
            className="bg-space-900 border border-gray-700"
            data-oid="2kxr:l7"
          >
            <DialogHeader data-oid="x:bs4wk">
              <DialogTitle className="text-white" data-oid="5kgvv4q">
                Edit User: {selectedUser.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4" data-oid="bqd63og">
              <div className="grid grid-cols-2 gap-4" data-oid="9m_:wn.">
                <div className="space-y-2" data-oid="uxqfuef">
                  <label className="text-sm text-gray-400" data-oid="6uv3kox">
                    Name
                  </label>
                  <Input
                    className="bg-space-800 border-gray-700 text-white"
                    defaultValue={selectedUser.name}
                    data-oid="w23e_7t"
                  />
                </div>
                <div className="space-y-2" data-oid="82l8cyb">
                  <label className="text-sm text-gray-400" data-oid="1am-l8k">
                    Email
                  </label>
                  <Input
                    className="bg-space-800 border-gray-700 text-white"
                    defaultValue={selectedUser.email}
                    data-oid="ji7q_yd"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4" data-oid="__q4jfd">
                <div className="space-y-2" data-oid="t:z43u8">
                  <label className="text-sm text-gray-400" data-oid="g-z:ko1">
                    Role
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedUser.role}
                    data-oid="fg0_zrh"
                  >
                    <option value="Admin" data-oid="hc9g102">
                      Admin
                    </option>
                    <option value="Manager" data-oid="1rjofe8">
                      Manager
                    </option>
                    <option value="User" data-oid="ram5fej">
                      User
                    </option>
                  </select>
                </div>
                <div className="space-y-2" data-oid="_19km4k">
                  <label className="text-sm text-gray-400" data-oid="3_jg3mc">
                    Status
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedUser.status}
                    data-oid="yk4goki"
                  >
                    <option value="Active" data-oid="qw6-ryt">
                      Active
                    </option>
                    <option value="Inactive" data-oid=":wcty2a">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-oid="sjizh_x">
                <label className="text-sm text-gray-400" data-oid="2rr1psw">
                  Subscription
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  defaultValue={selectedUser.subscription}
                  data-oid="ipcc4.a"
                >
                  <option value="Free" data-oid="ym6oaj6">
                    Free
                  </option>
                  <option value="Basic" data-oid="ujpkeeq">
                    Basic
                  </option>
                  <option value="Pro" data-oid="5wlzzxg">
                    Professional
                  </option>
                </select>
              </div>

              <div
                className="p-3 border border-gray-700 rounded bg-space-800/50"
                data-oid="rutg4ja"
              >
                <h4
                  className="text-sm font-medium text-white mb-2"
                  data-oid="krkwqk7"
                >
                  Account Information
                </h4>
                <div
                  className="text-xs text-gray-400 space-y-1"
                  data-oid="eapn29a"
                >
                  <div className="flex justify-between" data-oid="gw_tvzp">
                    <span data-oid="b8whd5c">Registration Date:</span>
                    <span data-oid="yx5j8lt">
                      {formatDate(selectedUser.registrationDate)}
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="ai2be80">
                    <span data-oid="hc3.4qm">Last Login:</span>
                    <span data-oid=".2gbg_y">
                      {formatDate(selectedUser.lastLogin)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter data-oid="sz.s115">
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
                className="text-gray-300 hover:text-white hover:bg-space-800"
                data-oid="upgbwy_"
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-900 text-cyan hover:bg-purple-800"
                onClick={() => setSelectedUser(null)}
                data-oid="b4u3bix"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default UserManagement;
