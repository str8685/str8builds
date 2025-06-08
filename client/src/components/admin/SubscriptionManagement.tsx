import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  DollarSign,
  Calendar,
  Users,
  Clock,
  Tag,
  ArrowUpDown,
  TrendingUp,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample subscription plans data
const subscriptionPlans = [
  {
    id: 1,
    name: "Free",
    price: 0,
    billingPeriod: "month",
    description: "Basic features for individuals",
    usersCount: 120,
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "Basic tools", included: true },
      { name: "Limited reports", included: true },
      { name: "AI recommendations", included: false },
      { name: "Advanced weather analysis", included: false },
      { name: "Supplier integrations", included: false },
    ],
  },
  {
    id: 2,
    name: "Basic",
    price: 29.99,
    billingPeriod: "month",
    description: "Enhanced features for small teams",
    usersCount: 85,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "All tools", included: true },
      { name: "Full reports", included: true },
      { name: "Basic AI recommendations", included: true },
      { name: "Advanced weather analysis", included: false },
      { name: "Supplier integrations", included: false },
    ],
  },
  {
    id: 3,
    name: "Pro",
    price: 79.99,
    billingPeriod: "month",
    description: "Complete solution for businesses",
    usersCount: 43,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "All tools", included: true },
      { name: "Full reports", included: true },
      { name: "Advanced AI recommendations", included: true },
      { name: "Advanced weather analysis", included: true },
      { name: "Supplier integrations", included: true },
    ],
  },
];

// Sample subscriptions data
const subscriptionHistory = [
  {
    id: 1,
    userId: 1,
    userName: "John Smith",
    planName: "Pro",
    status: "Active",
    startDate: "2023-01-15",
    expiryDate: "2024-01-15",
    amount: 79.99,
    autoRenew: true,
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Johnson",
    planName: "Pro",
    status: "Active",
    startDate: "2023-03-10",
    expiryDate: "2024-03-10",
    amount: 79.99,
    autoRenew: true,
  },
  {
    id: 3,
    userId: 3,
    userName: "Dave Wilson",
    planName: "Basic",
    status: "Active",
    startDate: "2023-04-22",
    expiryDate: "2023-10-22",
    amount: 29.99,
    autoRenew: false,
  },
  {
    id: 4,
    userId: 4,
    userName: "Emma Brown",
    planName: "Basic",
    status: "Active",
    startDate: "2023-05-11",
    expiryDate: "2023-11-11",
    amount: 29.99,
    autoRenew: true,
  },
  {
    id: 5,
    userId: 5,
    userName: "Michael Tan",
    planName: "Pro",
    status: "Active",
    startDate: "2023-02-08",
    expiryDate: "2024-02-08",
    amount: 79.99,
    autoRenew: true,
  },
];

const SubscriptionManagement: FC = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof subscriptionPlans)[0] | null
  >(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const totalRevenue = subscriptionHistory.reduce(
    (sum, sub) => sum + sub.amount,
    0,
  );
  const activeSubscriptions = subscriptionHistory.filter(
    (sub) => sub.status === "Active",
  ).length;

  return (
    <div className="space-y-4" data-oid="oog8:rz">
      <div className="flex justify-between items-center" data-oid="zfh.si:">
        <h3 className="text-xl font-bold text-white" data-oid="dk9g0la">
          Subscription Management
        </h3>
        <div className="flex gap-2" data-oid="diw8ulh">
          {activeTab === "plans" && (
            <Button
              onClick={() => setShowAddPlan(true)}
              className="bg-purple-900 text-cyan hover:bg-purple-800 btn-glow btn-glow-cyan"
              data-oid=":.nb:il"
            >
              <Plus className="h-4 w-4 mr-2" data-oid="9apcy5o" />
              Add Plan
            </Button>
          )}
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="u03i_fb">
        <GlassCard className="p-4 flex items-center" data-oid="50081i3">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="bo3si9x"
          >
            <Users className="h-5 w-5 text-cyan" data-oid="fzwdxhv" />
          </div>
          <div data-oid="m-esv6n">
            <div className="text-sm text-gray-400" data-oid=".k7wcsu">
              Active Subscriptions
            </div>
            <div className="text-2xl font-bold text-white" data-oid="rnaj210">
              {activeSubscriptions}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="_yf:6r9">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="1sremwc"
          >
            <DollarSign className="h-5 w-5 text-teal" data-oid="dms4_cf" />
          </div>
          <div data-oid="bg8nmzz">
            <div className="text-sm text-gray-400" data-oid="_82zmh9">
              Monthly Revenue
            </div>
            <div className="text-2xl font-bold text-white" data-oid="xx_3psn">
              ${totalRevenue.toFixed(2)}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="-0kj:oi">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="s0ynbki"
          >
            <TrendingUp className="h-5 w-5 text-electric" data-oid="rnubek-" />
          </div>
          <div data-oid="-z08ro:">
            <div className="text-sm text-gray-400" data-oid="3h44ws:">
              Avg. Revenue/User
            </div>
            <div className="text-2xl font-bold text-white" data-oid="3uba3hw">
              ${(totalRevenue / activeSubscriptions).toFixed(2)}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="plans"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
        data-oid="23a3f0h"
      >
        <TabsList
          className="bg-space-900 border border-space-700 p-1"
          data-oid="o_.t5_x"
        >
          <TabsTrigger
            value="plans"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="vof_-le"
          >
            <Tag className="h-4 w-4 mr-2" data-oid="yuarwye" />
            Subscription Plans
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="1q:5-9-"
          >
            <CreditCard className="h-4 w-4 mr-2" data-oid="sjh0s8." />
            User Subscriptions
          </TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4" data-oid="fbapnrp">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-oid="s1amr.v"
          >
            {subscriptionPlans.map((plan) => (
              <GlassCard
                key={plan.id}
                className="p-0 overflow-hidden"
                data-oid="d.o073:"
              >
                <div
                  className="p-4 bg-space-800 border-b border-gray-700 flex justify-between items-center"
                  data-oid="iwhpmci"
                >
                  <h4
                    className="font-bold text-lg text-white"
                    data-oid="wo9sayt"
                  >
                    {plan.name}
                  </h4>
                  <div className="flex space-x-1" data-oid="pdi0s1f">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowEditPlan(true);
                      }}
                      className="p-1 text-gray-400 hover:text-cyan"
                      data-oid="o8_3fqi"
                    >
                      <Edit className="h-4 w-4" data-oid=":10imql" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-red-400"
                      data-oid="d77c:cc"
                    >
                      <Trash2 className="h-4 w-4" data-oid="1_5s3.4" />
                    </button>
                  </div>
                </div>

                <div className="p-4" data-oid="afl0qnc">
                  <div className="mb-4" data-oid="og..onb">
                    <div className="flex items-baseline" data-oid="d8l31v4">
                      <span
                        className="text-2xl font-bold text-white"
                        data-oid="9d80.5t"
                      >
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-1" data-oid="qef4kc1">
                        /{plan.billingPeriod}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400" data-oid=".-k52cy">
                      {plan.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center py-2 border-t border-b border-gray-700 mb-4"
                    data-oid="odf4vv5"
                  >
                    <Users
                      className="h-4 w-4 text-cyan mr-2"
                      data-oid="z.v6e7a"
                    />

                    <span className="text-sm text-white" data-oid="gfjec21">
                      {plan.usersCount} users
                    </span>
                  </div>

                  <div className="space-y-2" data-oid="jxsq:yf">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center"
                        data-oid=":jhd.ee"
                      >
                        {feature.included ? (
                          <CheckCircle
                            className="h-4 w-4 text-green-400 mr-2"
                            data-oid="79tv.oz"
                          />
                        ) : (
                          <div
                            className="h-4 w-4 rounded-full border border-gray-600 mr-2"
                            data-oid="8rorqoj"
                          ></div>
                        )}
                        <span
                          className={`text-sm ${feature.included ? "text-white" : "text-gray-500"}`}
                          data-oid="lz4x771"
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent
          value="subscriptions"
          className="space-y-4"
          data-oid="hj50mxo"
        >
          <GlassCard className="p-0 overflow-hidden" data-oid="28kl95b">
            <div className="overflow-x-auto" data-oid="63.uu3c">
              <table className="w-full text-left" data-oid="ybmfb_i">
                <thead
                  className="bg-space-900 text-gray-300 text-sm"
                  data-oid="sh22cb."
                >
                  <tr data-oid="s-ef5er">
                    <th className="px-4 py-3 font-medium" data-oid=":mupn_q">
                      User
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="qldh285">
                      <div className="flex items-center" data-oid="xct5-8y">
                        Plan
                        <ArrowUpDown
                          className="h-3 w-3 ml-1"
                          data-oid="r_tmc8e"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="nab5rni">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="s5tz15:">
                      Start Date
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="vjpgcul">
                      Expiry Date
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="hpzeg-j">
                      Auto-Renew
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="0sil_cl">
                      Amount
                    </th>
                    <th
                      className="px-4 py-3 font-medium text-right"
                      data-oid="u-vw27c"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-800 text-white"
                  data-oid="pnykgdo"
                >
                  {subscriptionHistory.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-space-900/50"
                      data-oid="w7k.o5y"
                    >
                      <td className="px-4 py-3 text-cyan" data-oid="1dz95c3">
                        {sub.userName}
                      </td>
                      <td className="px-4 py-3" data-oid="smev4sl">
                        {sub.planName === "Pro" && (
                          <Badge
                            className="bg-teal-900 text-teal-300"
                            data-oid="dt.-i1-"
                          >
                            Pro
                          </Badge>
                        )}
                        {sub.planName === "Basic" && (
                          <Badge
                            className="bg-blue-900 text-blue-300"
                            data-oid="hyb4m0w"
                          >
                            Basic
                          </Badge>
                        )}
                        {sub.planName === "Free" && (
                          <Badge
                            className="bg-gray-700 text-gray-300"
                            data-oid="mv3.1kw"
                          >
                            Free
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3" data-oid="gl_u_cs">
                        <Badge
                          className="bg-green-900 text-green-300"
                          data-oid="o79sujs"
                        >
                          Active
                        </Badge>
                      </td>
                      <td
                        className="px-4 py-3 text-gray-400 text-sm"
                        data-oid="7_2l1cp"
                      >
                        {formatDate(sub.startDate)}
                      </td>
                      <td
                        className="px-4 py-3 text-gray-400 text-sm"
                        data-oid="yc5n.bi"
                      >
                        {formatDate(sub.expiryDate)}
                      </td>
                      <td className="px-4 py-3 text-sm" data-oid="6caela1">
                        {sub.autoRenew ? (
                          <span className="text-green-400" data-oid="dvw8ixe">
                            Yes
                          </span>
                        ) : (
                          <span className="text-yellow-400" data-oid="ov_r7v.">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3" data-oid="22goady">
                        ${sub.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right" data-oid="5ki2pj4">
                        <div
                          className="flex justify-end space-x-2"
                          data-oid="rsin6iy"
                        >
                          <button
                            className="p-1 text-gray-400 hover:text-cyan rounded"
                            data-oid=".jjfl1p"
                          >
                            <Edit className="h-4 w-4" data-oid="jz:8kns" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="bg-space-900 px-4 py-3 flex items-center justify-between"
              data-oid="3k23qz1"
            >
              <div className="text-sm text-gray-400" data-oid=":nt9-o1">
                Showing {subscriptionHistory.length} subscriptions
              </div>
              <div className="flex space-x-1" data-oid="3lqdu5b">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-space-800 border-gray-700 text-gray-300"
                  data-oid="ib-o3c7"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-space-800 border-gray-700 text-gray-300"
                  data-oid="qo8j_pq"
                >
                  Next
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* Add Plan Dialog */}
      <Dialog
        open={showAddPlan}
        onOpenChange={setShowAddPlan}
        data-oid="6q8nkug"
      >
        <DialogContent
          className="bg-space-900 border border-gray-700"
          data-oid="3-m9r2i"
        >
          <DialogHeader data-oid="n.:ho8r">
            <DialogTitle className="text-white" data-oid="4ldubo-">
              Add New Subscription Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4" data-oid="7n0.5lb">
            <div className="space-y-2" data-oid="j944vjo">
              <label className="text-sm text-gray-400" data-oid="-xt8hjg">
                Plan Name
              </label>
              <Input
                className="bg-space-800 border-gray-700 text-white"
                placeholder="Enterprise"
                data-oid="_avnta3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4" data-oid="pwm4ydo">
              <div className="space-y-2" data-oid="yk:i-2k">
                <label className="text-sm text-gray-400" data-oid="j49znin">
                  Price
                </label>
                <div className="relative" data-oid="nv8geq1">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    data-oid="ccig3:n"
                  />

                  <Input
                    className="bg-space-800 border-gray-700 text-white pl-10"
                    placeholder="149.99"
                    data-oid="zn.06.v"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="crruq12">
                <label className="text-sm text-gray-400" data-oid="_g8qyb9">
                  Billing Period
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="xa-sul8"
                >
                  <option value="month" data-oid="ipsy9g3">
                    Monthly
                  </option>
                  <option value="year" data-oid="hol360i">
                    Yearly
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-2" data-oid="c:6_64n">
              <label className="text-sm text-gray-400" data-oid="3j2k0cp">
                Description
              </label>
              <Input
                className="bg-space-800 border-gray-700 text-white"
                placeholder="Complete solution for large businesses"
                data-oid="vq8-_d1"
              />
            </div>

            <div className="space-y-2" data-oid="maupdvu">
              <label className="text-sm text-gray-400" data-oid="zhyhmdx">
                Features (one per line)
              </label>
              <textarea
                className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white h-32"
                placeholder="Unlimited projects&#10;All tools&#10;Premium support&#10;API access"
                data-oid="9:.7fuk"
              ></textarea>
            </div>
          </div>

          <DialogFooter data-oid="th2yzwi">
            <Button
              variant="ghost"
              onClick={() => setShowAddPlan(false)}
              className="text-gray-300 hover:text-white hover:bg-space-800"
              data-oid="lz7xhap"
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-900 text-cyan hover:bg-purple-800"
              onClick={() => setShowAddPlan(false)}
              data-oid="_gh6e7y"
            >
              Add Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog
        open={showEditPlan}
        onOpenChange={setShowEditPlan}
        data-oid="815p-56"
      >
        {selectedPlan && (
          <DialogContent
            className="bg-space-900 border border-gray-700"
            data-oid="avt28ju"
          >
            <DialogHeader data-oid="16qv2o7">
              <DialogTitle className="text-white" data-oid="2j03zn.">
                Edit Plan: {selectedPlan.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4" data-oid="5-7g2ya">
              <div className="space-y-2" data-oid="afyqz:u">
                <label className="text-sm text-gray-400" data-oid="7_-x4ic">
                  Plan Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  defaultValue={selectedPlan.name}
                  data-oid="2r_fex2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4" data-oid="qztlv25">
                <div className="space-y-2" data-oid="b01_g6h">
                  <label className="text-sm text-gray-400" data-oid="svo66ln">
                    Price
                  </label>
                  <div className="relative" data-oid="r25zdpw">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      data-oid="axxum_d"
                    />

                    <Input
                      className="bg-space-800 border-gray-700 text-white pl-10"
                      defaultValue={selectedPlan.price.toString()}
                      data-oid="-6kg-yl"
                    />
                  </div>
                </div>
                <div className="space-y-2" data-oid="wzl8suf">
                  <label className="text-sm text-gray-400" data-oid="r.aeltt">
                    Billing Period
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedPlan.billingPeriod}
                    data-oid="dzoijmw"
                  >
                    <option value="month" data-oid="31gqrt.">
                      Monthly
                    </option>
                    <option value="year" data-oid="u_lx288">
                      Yearly
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-oid="1br73qc">
                <label className="text-sm text-gray-400" data-oid="tyh22qg">
                  Description
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  defaultValue={selectedPlan.description}
                  data-oid="74y.yz."
                />
              </div>

              <div className="space-y-2" data-oid="twqa1o1">
                <label className="text-sm text-gray-400" data-oid="m4fnphk">
                  Features
                </label>
                <div className="space-y-2" data-oid="q18pwxj">
                  {selectedPlan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2"
                      data-oid="j67_:11"
                    >
                      <input
                        type="checkbox"
                        checked={feature.included}
                        className="h-4 w-4"
                        data-oid="oh54-c7"
                      />

                      <Input
                        className="bg-space-800 border-gray-700 text-white flex-grow"
                        defaultValue={feature.name}
                        data-oid="dyffg:."
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-space-800 border-gray-700 text-gray-300"
                    data-oid="1m6an5y"
                  >
                    <Plus className="h-3 w-3 mr-2" data-oid="0nbjii7" /> Add
                    Feature
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter data-oid="444sx_5">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedPlan(null);
                  setShowEditPlan(false);
                }}
                className="text-gray-300 hover:text-white hover:bg-space-800"
                data-oid="ry0eyy_"
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-900 text-cyan hover:bg-purple-800"
                onClick={() => {
                  setSelectedPlan(null);
                  setShowEditPlan(false);
                }}
                data-oid="y7ppgow"
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

export default SubscriptionManagement;
