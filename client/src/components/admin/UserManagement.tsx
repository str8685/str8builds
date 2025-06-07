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
    <div className="space-y-4" data-oid="vjdiah.">
      <div className="flex justify-between items-center" data-oid="wev4qd-">
        <h3 className="text-xl font-bold text-white" data-oid="2nfa:3v">
          User Management
        </h3>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-purple-900 text-cyan hover:bg-purple-800 btn-glow btn-glow-cyan"
          data-oid="1l.y_t_"
        >
          <UserPlus className="h-4 w-4 mr-2" data-oid="h-.nb::" />
          Add User
        </Button>
      </div>

      {/* Filters and search */}
      <GlassCard className="p-4" data-oid="b.co7tf">
        <div className="flex flex-col md:flex-row gap-4" data-oid="n-75o--">
          <div className="relative flex-grow" data-oid=":w2l21c">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              data-oid="yo9.73u"
            />

            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-space-900 border-gray-700 text-white"
              data-oid="xsw8fcg"
            />
          </div>

          <div className="flex flex-wrap gap-2" data-oid="mg9dnu-">
            <div
              className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
              data-oid="3qux3s8"
            >
              <Filter
                className="h-4 w-4 text-gray-400 mr-2"
                data-oid="eohtzjb"
              />

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
                data-oid="r-654eb"
              >
                <option value="All" data-oid="9na42uq">
                  All Roles
                </option>
                <option value="Admin" data-oid="8469csq">
                  Admin
                </option>
                <option value="Manager" data-oid="i9l8190">
                  Manager
                </option>
                <option value="User" data-oid="g70rokp">
                  User
                </option>
              </select>
            </div>

            <div
              className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
              data-oid="s4_pmn3"
            >
              <Filter
                className="h-4 w-4 text-gray-400 mr-2"
                data-oid="s04:f7p"
              />

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
                data-oid="iuir3ib"
              >
                <option value="All" data-oid="8afs7w0">
                  All Status
                </option>
                <option value="Active" data-oid="s5lecsp">
                  Active
                </option>
                <option value="Inactive" data-oid="pmzczqs">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Users table */}
      <GlassCard className="p-0 overflow-hidden" data-oid="2y5imvd">
        <div className="overflow-x-auto" data-oid="j-vb9ek">
          <table className="w-full text-left" data-oid="3yvjlcp">
            <thead
              className="bg-space-900 text-gray-300 text-sm"
              data-oid="c4yr24-"
            >
              <tr data-oid="-gl895l">
                <th
                  className="px-4 py-3 font-medium flex items-center"
                  data-oid="67v65b9"
                >
                  <User className="h-4 w-4 mr-2" data-oid="b-t7v07" />
                  Name
                  <ArrowUpDown className="h-3 w-3 ml-1" data-oid="7kyqlit" />
                </th>
                <th className="px-4 py-3 font-medium" data-oid="qd1uzq5">
                  Email
                </th>
                <th className="px-4 py-3 font-medium" data-oid="jq3v1rx">
                  Role
                </th>
                <th className="px-4 py-3 font-medium" data-oid="_b94x_v">
                  Status
                </th>
                <th className="px-4 py-3 font-medium" data-oid="68no30m">
                  Subscription
                </th>
                <th className="px-4 py-3 font-medium" data-oid="q2msps5">
                  Registered
                </th>
                <th className="px-4 py-3 font-medium" data-oid="kbxnjhg">
                  Last Login
                </th>
                <th
                  className="px-4 py-3 font-medium text-right"
                  data-oid="c8e6zuy"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-800 text-white"
              data-oid="8.m4b0i"
            >
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-space-900/50"
                  data-oid="k13ld4-"
                >
                  <td className="px-4 py-3 text-cyan" data-oid="u0e:2d9">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-300" data-oid="xexlb_o">
                    {user.email}
                  </td>
                  <td className="px-4 py-3" data-oid="ehn-61:">
                    {user.role === "Admin" && (
                      <Badge
                        className="bg-purple-900 text-cyan"
                        data-oid="--bmn_4"
                      >
                        <Shield className="h-3 w-3 mr-1" data-oid="ttjgz1v" />
                        Admin
                      </Badge>
                    )}
                    {user.role === "Manager" && (
                      <Badge
                        className="bg-blue-900 text-blue-300"
                        data-oid="dq4fs8x"
                      >
                        Manager
                      </Badge>
                    )}
                    {user.role === "User" && (
                      <Badge
                        className="bg-gray-700 text-gray-300"
                        data-oid="a:-5eh4"
                      >
                        User
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3" data-oid="madh-gp">
                    {user.status === "Active" ? (
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="wffr-r8"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-red-900 text-red-300"
                        data-oid="ac9a7t:"
                      >
                        Inactive
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3" data-oid="drs2l5v">
                    {user.subscription === "Pro" ? (
                      <Badge
                        className="bg-teal-900 text-teal-300"
                        data-oid="-t6ydft"
                      >
                        Pro
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-blue-900 text-blue-300"
                        data-oid="k3153zq"
                      >
                        Basic
                      </Badge>
                    )}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-400 text-sm"
                    data-oid="81m70y_"
                  >
                    {formatDate(user.registrationDate)}
                  </td>
                  <td
                    className="px-4 py-3 text-gray-400 text-sm"
                    data-oid="n.q-nxv"
                  >
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-4 py-3 text-right" data-oid="vifu43n">
                    <div
                      className="flex justify-end space-x-2"
                      data-oid="y_xeegb"
                    >
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1 text-gray-400 hover:text-cyan rounded"
                        data-oid="toik-wk"
                      >
                        <Edit className="h-4 w-4" data-oid="e2yci9f" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-400 rounded"
                        data-oid="6mjhzdl"
                      >
                        <Trash2 className="h-4 w-4" data-oid=":mtjusj" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400" data-oid="4s1c9sv">
            No users found matching your filters.
          </div>
        )}

        <div
          className="bg-space-900 px-4 py-3 flex items-center justify-between"
          data-oid="7ducdjb"
        >
          <div className="text-sm text-gray-400" data-oid="df5939-">
            Showing {filteredUsers.length} of {sampleUsers.length} users
          </div>
          <div className="flex space-x-1" data-oid="o_rdq3d">
            <Button
              variant="outline"
              size="sm"
              className="bg-space-800 border-gray-700 text-gray-300"
              data-oid="ayo:f6l"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-space-800 border-gray-700 text-gray-300"
              data-oid="g4o_w6."
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
        data-oid="xnwd:p3"
      >
        <DialogContent
          className="bg-space-900 border border-gray-700"
          data-oid="ikkye3g"
        >
          <DialogHeader data-oid="j.5nug.">
            <DialogTitle className="text-white" data-oid="26vluql">
              Add New User
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4" data-oid=":31-v9k">
            <div className="grid grid-cols-2 gap-4" data-oid="m1rf9gx">
              <div className="space-y-2" data-oid="o07zpn:">
                <label className="text-sm text-gray-400" data-oid="ef_si6r">
                  First Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  placeholder="John"
                  data-oid="nr8owvn"
                />
              </div>
              <div className="space-y-2" data-oid="r_.kt68">
                <label className="text-sm text-gray-400" data-oid="okokx3y">
                  Last Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  placeholder="Smith"
                  data-oid="ha2h-b3"
                />
              </div>
            </div>

            <div className="space-y-2" data-oid="v9tjwvk">
              <label className="text-sm text-gray-400" data-oid="6xabav9">
                Email
              </label>
              <div className="relative" data-oid="7ftaxjk">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid="m1-y7t_"
                />

                <Input
                  className="bg-space-800 border-gray-700 text-white pl-10"
                  placeholder="user@example.com"
                  data-oid="d:c6t5e"
                />
              </div>
            </div>

            <div className="space-y-2" data-oid="eqedtj2">
              <label className="text-sm text-gray-400" data-oid="v-smkic">
                Password
              </label>
              <div className="relative" data-oid="kvpdvvz">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid="nfz99tq"
                />

                <Input
                  type="password"
                  className="bg-space-800 border-gray-700 text-white pl-10"
                  placeholder="Set a secure password"
                  data-oid="1h48vk2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" data-oid="2m-pigk">
              <div className="space-y-2" data-oid="7yk1qv.">
                <label className="text-sm text-gray-400" data-oid="c1ahkf7">
                  Role
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="c0:riyn"
                >
                  <option value="Admin" data-oid="2cusy.o">
                    Admin
                  </option>
                  <option value="Manager" data-oid="m2hkmya">
                    Manager
                  </option>
                  <option value="User" selected data-oid="1crtv7s">
                    User
                  </option>
                </select>
              </div>
              <div className="space-y-2" data-oid="plyvqho">
                <label className="text-sm text-gray-400" data-oid="64nbxq0">
                  Subscription
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="yemmhr3"
                >
                  <option value="Free" data-oid="b5u0mhj">
                    Free
                  </option>
                  <option value="Basic" data-oid="qpp97qj">
                    Basic
                  </option>
                  <option value="Pro" data-oid="wnezfw5">
                    Professional
                  </option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter data-oid="badajmr">
            <Button
              variant="ghost"
              onClick={() => setShowAddUser(false)}
              className="text-gray-300 hover:text-white hover:bg-space-800"
              data-oid="tlyrh_i"
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-900 text-cyan hover:bg-purple-800"
              onClick={() => setShowAddUser(false)}
              data-oid="6vurtga"
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
        data-oid="z0npqf."
      >
        {selectedUser && (
          <DialogContent
            className="bg-space-900 border border-gray-700"
            data-oid="5rouzwh"
          >
            <DialogHeader data-oid="rplg.cm">
              <DialogTitle className="text-white" data-oid="_xjpggi">
                Edit User: {selectedUser.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4" data-oid="ic2:tih">
              <div className="grid grid-cols-2 gap-4" data-oid=":byc1hl">
                <div className="space-y-2" data-oid="qjilvr7">
                  <label className="text-sm text-gray-400" data-oid="yye.8.b">
                    Name
                  </label>
                  <Input
                    className="bg-space-800 border-gray-700 text-white"
                    defaultValue={selectedUser.name}
                    data-oid=":ubr3dn"
                  />
                </div>
                <div className="space-y-2" data-oid="7pkp.t4">
                  <label className="text-sm text-gray-400" data-oid="185nb:i">
                    Email
                  </label>
                  <Input
                    className="bg-space-800 border-gray-700 text-white"
                    defaultValue={selectedUser.email}
                    data-oid="ciipbl4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4" data-oid="wvjj-6_">
                <div className="space-y-2" data-oid=":q6w_lu">
                  <label className="text-sm text-gray-400" data-oid="-vgq489">
                    Role
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedUser.role}
                    data-oid="zbq7_2l"
                  >
                    <option value="Admin" data-oid="u0l6w3q">
                      Admin
                    </option>
                    <option value="Manager" data-oid="y86sktg">
                      Manager
                    </option>
                    <option value="User" data-oid="nc6bx:2">
                      User
                    </option>
                  </select>
                </div>
                <div className="space-y-2" data-oid="q3v7p5q">
                  <label className="text-sm text-gray-400" data-oid="vss:g:1">
                    Status
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedUser.status}
                    data-oid="tg2yadb"
                  >
                    <option value="Active" data-oid=":ez955-">
                      Active
                    </option>
                    <option value="Inactive" data-oid="0_.vaus">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-oid="4och8rl">
                <label className="text-sm text-gray-400" data-oid="4ugaidd">
                  Subscription
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  defaultValue={selectedUser.subscription}
                  data-oid="ukpm6xl"
                >
                  <option value="Free" data-oid="vehhu_6">
                    Free
                  </option>
                  <option value="Basic" data-oid="1r-t6u5">
                    Basic
                  </option>
                  <option value="Pro" data-oid="sd5to_5">
                    Professional
                  </option>
                </select>
              </div>

              <div
                className="p-3 border border-gray-700 rounded bg-space-800/50"
                data-oid="ca5e.l4"
              >
                <h4
                  className="text-sm font-medium text-white mb-2"
                  data-oid="-a_ibd4"
                >
                  Account Information
                </h4>
                <div
                  className="text-xs text-gray-400 space-y-1"
                  data-oid="b_x.mj6"
                >
                  <div className="flex justify-between" data-oid="4qi1fj3">
                    <span data-oid="ms1i_gv">Registration Date:</span>
                    <span data-oid="7hx1q-_">
                      {formatDate(selectedUser.registrationDate)}
                    </span>
                  </div>
                  <div className="flex justify-between" data-oid="0plgvrk">
                    <span data-oid="2pre_.3">Last Login:</span>
                    <span data-oid="ist.coa">
                      {formatDate(selectedUser.lastLogin)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter data-oid="._7utse">
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
                className="text-gray-300 hover:text-white hover:bg-space-800"
                data-oid="168pqvz"
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-900 text-cyan hover:bg-purple-800"
                onClick={() => setSelectedUser(null)}
                data-oid="11ws7mm"
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
