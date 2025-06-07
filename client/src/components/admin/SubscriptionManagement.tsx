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
    <div className="space-y-4" data-oid="hesvmru">
      <div className="flex justify-between items-center" data-oid="-b6nuy2">
        <h3 className="text-xl font-bold text-white" data-oid="rr6jl8.">
          Subscription Management
        </h3>
        <div className="flex gap-2" data-oid="8mulibz">
          {activeTab === "plans" && (
            <Button
              onClick={() => setShowAddPlan(true)}
              className="bg-purple-900 text-cyan hover:bg-purple-800 btn-glow btn-glow-cyan"
              data-oid="439x_o0"
            >
              <Plus className="h-4 w-4 mr-2" data-oid="vm4e6.b" />
              Add Plan
            </Button>
          )}
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="atcpoy3">
        <GlassCard className="p-4 flex items-center" data-oid="ea.w-g6">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="e28me-_"
          >
            <Users className="h-5 w-5 text-cyan" data-oid="cqkm5l2" />
          </div>
          <div data-oid="k::r01q">
            <div className="text-sm text-gray-400" data-oid="s7m_3ca">
              Active Subscriptions
            </div>
            <div className="text-2xl font-bold text-white" data-oid="tnui_xq">
              {activeSubscriptions}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="2aq_y:h">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="ljtu-sm"
          >
            <DollarSign className="h-5 w-5 text-teal" data-oid="lszmn-y" />
          </div>
          <div data-oid="ujo6mi4">
            <div className="text-sm text-gray-400" data-oid="xbeyrpp">
              Monthly Revenue
            </div>
            <div className="text-2xl font-bold text-white" data-oid="wa4hbnz">
              ${totalRevenue.toFixed(2)}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="x:8tkl4">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="7p.-os5"
          >
            <TrendingUp className="h-5 w-5 text-electric" data-oid="t3at7vy" />
          </div>
          <div data-oid="14sp3b5">
            <div className="text-sm text-gray-400" data-oid="g6r2itj">
              Avg. Revenue/User
            </div>
            <div className="text-2xl font-bold text-white" data-oid="_0f3lip">
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
        data-oid="w3g.grg"
      >
        <TabsList
          className="bg-space-900 border border-space-700 p-1"
          data-oid="a:jn6oo"
        >
          <TabsTrigger
            value="plans"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="cjv:9s1"
          >
            <Tag className="h-4 w-4 mr-2" data-oid="fkivq.l" />
            Subscription Plans
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="mc1px-9"
          >
            <CreditCard className="h-4 w-4 mr-2" data-oid="42tx2ob" />
            User Subscriptions
          </TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4" data-oid="5j1_4qp">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-oid="6oj84z3"
          >
            {subscriptionPlans.map((plan) => (
              <GlassCard
                key={plan.id}
                className="p-0 overflow-hidden"
                data-oid="im2z9kn"
              >
                <div
                  className="p-4 bg-space-800 border-b border-gray-700 flex justify-between items-center"
                  data-oid="k96zvmz"
                >
                  <h4
                    className="font-bold text-lg text-white"
                    data-oid="58w582s"
                  >
                    {plan.name}
                  </h4>
                  <div className="flex space-x-1" data-oid="vf.urrl">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowEditPlan(true);
                      }}
                      className="p-1 text-gray-400 hover:text-cyan"
                      data-oid="trn9_ao"
                    >
                      <Edit className="h-4 w-4" data-oid="jqo0f2k" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-red-400"
                      data-oid="e53_o4t"
                    >
                      <Trash2 className="h-4 w-4" data-oid="tk.:gjm" />
                    </button>
                  </div>
                </div>

                <div className="p-4" data-oid="lqceeid">
                  <div className="mb-4" data-oid="ad1yp0b">
                    <div className="flex items-baseline" data-oid="zbbuqx4">
                      <span
                        className="text-2xl font-bold text-white"
                        data-oid="zt165i4"
                      >
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-1" data-oid="owmz1a9">
                        /{plan.billingPeriod}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400" data-oid="bes8eej">
                      {plan.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center py-2 border-t border-b border-gray-700 mb-4"
                    data-oid="7vkoh-o"
                  >
                    <Users
                      className="h-4 w-4 text-cyan mr-2"
                      data-oid="sy16gxo"
                    />

                    <span className="text-sm text-white" data-oid="4e32zqa">
                      {plan.usersCount} users
                    </span>
                  </div>

                  <div className="space-y-2" data-oid="ni:6e0j">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center"
                        data-oid="dr87n_p"
                      >
                        {feature.included ? (
                          <CheckCircle
                            className="h-4 w-4 text-green-400 mr-2"
                            data-oid="zlpq-yq"
                          />
                        ) : (
                          <div
                            className="h-4 w-4 rounded-full border border-gray-600 mr-2"
                            data-oid="jxs:g3:"
                          ></div>
                        )}
                        <span
                          className={`text-sm ${feature.included ? "text-white" : "text-gray-500"}`}
                          data-oid="d_9qzgv"
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
          data-oid="2xue:.t"
        >
          <GlassCard className="p-0 overflow-hidden" data-oid="fhna-1d">
            <div className="overflow-x-auto" data-oid="ajhfmwk">
              <table className="w-full text-left" data-oid="wg5ddu.">
                <thead
                  className="bg-space-900 text-gray-300 text-sm"
                  data-oid="elhhor0"
                >
                  <tr data-oid="6f.oj.7">
                    <th className="px-4 py-3 font-medium" data-oid="v05nw15">
                      User
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="npipnu-">
                      <div className="flex items-center" data-oid="ie:6r3m">
                        Plan
                        <ArrowUpDown
                          className="h-3 w-3 ml-1"
                          data-oid="ta6l95u"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="1n:bhig">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="djrtoeo">
                      Start Date
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="-46d6_6">
                      Expiry Date
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="vbtovpx">
                      Auto-Renew
                    </th>
                    <th className="px-4 py-3 font-medium" data-oid="i-.hv7b">
                      Amount
                    </th>
                    <th
                      className="px-4 py-3 font-medium text-right"
                      data-oid="3l67n5y"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-800 text-white"
                  data-oid="myznme5"
                >
                  {subscriptionHistory.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-space-900/50"
                      data-oid="elpv2m1"
                    >
                      <td className="px-4 py-3 text-cyan" data-oid="hlqm45-">
                        {sub.userName}
                      </td>
                      <td className="px-4 py-3" data-oid="ny_ohfs">
                        {sub.planName === "Pro" && (
                          <Badge
                            className="bg-teal-900 text-teal-300"
                            data-oid="78pyyke"
                          >
                            Pro
                          </Badge>
                        )}
                        {sub.planName === "Basic" && (
                          <Badge
                            className="bg-blue-900 text-blue-300"
                            data-oid="cxhl89h"
                          >
                            Basic
                          </Badge>
                        )}
                        {sub.planName === "Free" && (
                          <Badge
                            className="bg-gray-700 text-gray-300"
                            data-oid="pu756h2"
                          >
                            Free
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3" data-oid="bux532k">
                        <Badge
                          className="bg-green-900 text-green-300"
                          data-oid="y60.f5-"
                        >
                          Active
                        </Badge>
                      </td>
                      <td
                        className="px-4 py-3 text-gray-400 text-sm"
                        data-oid="50:p6v0"
                      >
                        {formatDate(sub.startDate)}
                      </td>
                      <td
                        className="px-4 py-3 text-gray-400 text-sm"
                        data-oid="pc74k29"
                      >
                        {formatDate(sub.expiryDate)}
                      </td>
                      <td className="px-4 py-3 text-sm" data-oid="qgi9pm0">
                        {sub.autoRenew ? (
                          <span className="text-green-400" data-oid="nu6:j-d">
                            Yes
                          </span>
                        ) : (
                          <span className="text-yellow-400" data-oid="yvgduce">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3" data-oid="oym64zx">
                        ${sub.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right" data-oid="g52filz">
                        <div
                          className="flex justify-end space-x-2"
                          data-oid="zqomm40"
                        >
                          <button
                            className="p-1 text-gray-400 hover:text-cyan rounded"
                            data-oid="qf.e6il"
                          >
                            <Edit className="h-4 w-4" data-oid=".sd1w_5" />
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
              data-oid="9rxvzzf"
            >
              <div className="text-sm text-gray-400" data-oid="a_nvvwf">
                Showing {subscriptionHistory.length} subscriptions
              </div>
              <div className="flex space-x-1" data-oid=".ncg_o5">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-space-800 border-gray-700 text-gray-300"
                  data-oid="9._z3a8"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-space-800 border-gray-700 text-gray-300"
                  data-oid="eys2_c-"
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
        data-oid="rz9ke5o"
      >
        <DialogContent
          className="bg-space-900 border border-gray-700"
          data-oid="4sj.dtu"
        >
          <DialogHeader data-oid="c5_8qn0">
            <DialogTitle className="text-white" data-oid="gmtuhcw">
              Add New Subscription Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4" data-oid="m7395fr">
            <div className="space-y-2" data-oid="eq7_wjl">
              <label className="text-sm text-gray-400" data-oid="3aecjkt">
                Plan Name
              </label>
              <Input
                className="bg-space-800 border-gray-700 text-white"
                placeholder="Enterprise"
                data-oid="icw5k_g"
              />
            </div>

            <div className="grid grid-cols-2 gap-4" data-oid="dpq:s.t">
              <div className="space-y-2" data-oid="18ic_ry">
                <label className="text-sm text-gray-400" data-oid="wrhnd4z">
                  Price
                </label>
                <div className="relative" data-oid="so_qoc9">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    data-oid="ngkub:7"
                  />

                  <Input
                    className="bg-space-800 border-gray-700 text-white pl-10"
                    placeholder="149.99"
                    data-oid="hnut.:1"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="y2epdv-">
                <label className="text-sm text-gray-400" data-oid="23-pa5a">
                  Billing Period
                </label>
                <select
                  className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                  data-oid="hnck6ub"
                >
                  <option value="month" data-oid="8j40wf9">
                    Monthly
                  </option>
                  <option value="year" data-oid="6gd4ul2">
                    Yearly
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-2" data-oid="plfgs-4">
              <label className="text-sm text-gray-400" data-oid="k9jdbqj">
                Description
              </label>
              <Input
                className="bg-space-800 border-gray-700 text-white"
                placeholder="Complete solution for large businesses"
                data-oid="v8l15:0"
              />
            </div>

            <div className="space-y-2" data-oid="llk7m7g">
              <label className="text-sm text-gray-400" data-oid="zrulghp">
                Features (one per line)
              </label>
              <textarea
                className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white h-32"
                placeholder="Unlimited projects&#10;All tools&#10;Premium support&#10;API access"
                data-oid="huw:pbn"
              ></textarea>
            </div>
          </div>

          <DialogFooter data-oid="grgnvyk">
            <Button
              variant="ghost"
              onClick={() => setShowAddPlan(false)}
              className="text-gray-300 hover:text-white hover:bg-space-800"
              data-oid="oiroork"
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-900 text-cyan hover:bg-purple-800"
              onClick={() => setShowAddPlan(false)}
              data-oid="8o8tpax"
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
        data-oid="zyp2h2m"
      >
        {selectedPlan && (
          <DialogContent
            className="bg-space-900 border border-gray-700"
            data-oid="4m8c37u"
          >
            <DialogHeader data-oid="ihfzp36">
              <DialogTitle className="text-white" data-oid="lnu16:l">
                Edit Plan: {selectedPlan.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4" data-oid="lkgjcmq">
              <div className="space-y-2" data-oid="weqqs7-">
                <label className="text-sm text-gray-400" data-oid="lxb4usa">
                  Plan Name
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  defaultValue={selectedPlan.name}
                  data-oid="mh9bs2r"
                />
              </div>

              <div className="grid grid-cols-2 gap-4" data-oid="jlu_x7g">
                <div className="space-y-2" data-oid="_vwylqv">
                  <label className="text-sm text-gray-400" data-oid="p9e09o0">
                    Price
                  </label>
                  <div className="relative" data-oid="34yzwzq">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      data-oid="w5534.3"
                    />

                    <Input
                      className="bg-space-800 border-gray-700 text-white pl-10"
                      defaultValue={selectedPlan.price.toString()}
                      data-oid="m:rdo1f"
                    />
                  </div>
                </div>
                <div className="space-y-2" data-oid="y6hrb:i">
                  <label className="text-sm text-gray-400" data-oid="9m9olqj">
                    Billing Period
                  </label>
                  <select
                    className="w-full bg-space-800 border border-gray-700 rounded p-2 text-white"
                    defaultValue={selectedPlan.billingPeriod}
                    data-oid="5hbjbfp"
                  >
                    <option value="month" data-oid="x5tvarc">
                      Monthly
                    </option>
                    <option value="year" data-oid="glawbp7">
                      Yearly
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-oid="9wbv1pg">
                <label className="text-sm text-gray-400" data-oid="mdr0l-5">
                  Description
                </label>
                <Input
                  className="bg-space-800 border-gray-700 text-white"
                  defaultValue={selectedPlan.description}
                  data-oid="zlu2bhm"
                />
              </div>

              <div className="space-y-2" data-oid="yo:trki">
                <label className="text-sm text-gray-400" data-oid="6:8slz2">
                  Features
                </label>
                <div className="space-y-2" data-oid="-u0oz01">
                  {selectedPlan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2"
                      data-oid="175q:49"
                    >
                      <input
                        type="checkbox"
                        checked={feature.included}
                        className="h-4 w-4"
                        data-oid="oneqjar"
                      />

                      <Input
                        className="bg-space-800 border-gray-700 text-white flex-grow"
                        defaultValue={feature.name}
                        data-oid="ras3dc0"
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-space-800 border-gray-700 text-gray-300"
                    data-oid="b3ku6ky"
                  >
                    <Plus className="h-3 w-3 mr-2" data-oid="v-9ptzv" /> Add
                    Feature
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter data-oid="xfwsm9p">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedPlan(null);
                  setShowEditPlan(false);
                }}
                className="text-gray-300 hover:text-white hover:bg-space-800"
                data-oid="5c7jaq3"
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-900 text-cyan hover:bg-purple-800"
                onClick={() => {
                  setSelectedPlan(null);
                  setShowEditPlan(false);
                }}
                data-oid="v4mzunh"
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
