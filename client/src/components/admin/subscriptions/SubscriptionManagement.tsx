import { FC, useState } from "react";
import {
  CreditCard,
  PlusCircle,
  Edit,
  Trash,
  ChevronDown,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  DollarSign,
  Shield,
} from "lucide-react";

interface Subscription {
  id: number;
  user: {
    name: string;
    email: string;
    company: string;
  };
  plan: "free" | "basic" | "professional" | "enterprise";
  status: "active" | "trialing" | "past_due" | "canceled";
  startDate: string;
  nextBilling: string;
  amount: string;
}

// No mock subscriptions - use real data from API
const mockSubscriptions: Subscription[] = [];

// Subscription plans
const subscriptionPlans = [
  {
    name: "Free",
    description: "Limited features for individuals",
    price: "$0",
    period: "forever",
    features: [
      "Basic calculators",
      "Simple project tracking",
      "Limited weather data",
      "Single user only",
    ],
  },
  {
    name: "Basic",
    description: "Essential tools for small businesses",
    price: "$19.99",
    period: "per month",
    popular: false,
    features: [
      "Advanced calculators",
      "Full project management",
      "Enhanced weather forecasts",
      "Up to 3 team members",
      "Basic reporting",
    ],
  },
  {
    name: "Professional",
    description: "Complete solution for growing companies",
    price: "$59.99",
    period: "per month",
    popular: true,
    features: [
      "All Basic features",
      "Advanced reporting & analytics",
      "AI recommendations",
      "Up to 10 team members",
      "Custom forms & templates",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solution for large organizations",
    price: "$129.99",
    period: "per month",
    features: [
      "All Professional features",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced security features",
      "Multi-site management",
    ],
  },
];

const SubscriptionManagement: FC = () => {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesPlan = selectedPlan === "" || sub.plan === selectedPlan;
    const matchesStatus =
      selectedStatus === "" || sub.status === selectedStatus;

    return matchesPlan && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return (
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="7qd:9:f" />
        );

      case "trialing":
        return <Clock className="h-4 w-4 text-blue-400" data-oid="4e9cfs3" />;
      case "past_due":
        return (
          <AlertCircle className="h-4 w-4 text-orange-400" data-oid="xaq9yqy" />
        );

      case "canceled":
        return <XCircle className="h-4 w-4 text-gray-400" data-oid="-p_ba0c" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/20 border-green-800 text-green-400";
      case "trialing":
        return "bg-blue-900/20 border-blue-800 text-blue-400";
      case "past_due":
        return "bg-orange-900/20 border-orange-800 text-orange-400";
      case "canceled":
        return "bg-gray-900/20 border-gray-800 text-gray-400";
      default:
        return "bg-gray-900/20 border-gray-800 text-gray-400";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "bg-gray-800 text-gray-200";
      case "basic":
        return "bg-blue-900/30 text-blue-300";
      case "professional":
        return "bg-cyan-900/30 text-cyan";
      case "enterprise":
        return "bg-purple-900/30 text-purple-300";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  const deleteSubscription = (id: number) => {
    if (window.confirm("Are you sure you want to cancel this subscription?")) {
      // In a real app, we'd make an API call
      // Here we'll just update the status to 'canceled'
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === id
            ? { ...sub, status: "canceled", nextBilling: "N/A" }
            : sub,
        ),
      );
    }
  };

  return (
    <div className="space-y-6" data-oid="9mil5k1">
      <div
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        data-oid="6g4p79_"
      >
        <h2
          className="text-xl font-bold text-white flex items-center"
          data-oid="14h9ij9"
        >
          <CreditCard className="h-5 w-5 mr-2 text-cyan" data-oid="szy38zc" />
          Subscription Management
        </h2>

        <div className="flex gap-2" data-oid="qo.hfsp">
          <div className="relative" data-oid="-lpyu7_">
            <select
              className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              data-oid="i4ny90d"
            >
              <option value="" data-oid=":7-evgq">
                All Plans
              </option>
              <option value="free" data-oid="c9hmyjg">
                Free
              </option>
              <option value="basic" data-oid="jsivqez">
                Basic
              </option>
              <option value="professional" data-oid="-o.z78p">
                Professional
              </option>
              <option value="enterprise" data-oid=":wsi0_w">
                Enterprise
              </option>
            </select>
            <ChevronDown
              className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
              data-oid="xppko9a"
            />
          </div>

          <div className="relative" data-oid="lxq-k_r">
            <select
              className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              data-oid="ssnlwq2"
            >
              <option value="" data-oid="3_vdtgw">
                All Status
              </option>
              <option value="active" data-oid="h0-v-ge">
                Active
              </option>
              <option value="trialing" data-oid="lm86pj7">
                Trialing
              </option>
              <option value="past_due" data-oid="su:.n_y">
                Past Due
              </option>
              <option value="canceled" data-oid="nqzxnps">
                Canceled
              </option>
            </select>
            <ChevronDown
              className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
              data-oid="kh9vew4"
            />
          </div>

          <button
            className="btn-glow btn-glow-cyan bg-purple-900 text-cyan px-3 py-2 rounded-lg flex items-center"
            data-oid="xq--9i-"
          >
            <PlusCircle className="h-4 w-4 mr-1.5" data-oid="qgr4-q:" />
            New Subscription
          </button>
        </div>
      </div>

      {/* Current Subscriptions */}
      <div
        className="bg-space-900 rounded-xl overflow-hidden glass-card"
        data-oid="j9mf6.."
      >
        <div className="overflow-x-auto" data-oid="djyt.50">
          <table className="w-full" data-oid="9s0kbmc">
            <thead data-oid="2_z.vov">
              <tr
                className="bg-space-800 border-b border-gray-700"
                data-oid="ilfgnrf"
              >
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="7nh6egx"
                >
                  User
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="q9v3qp5"
                >
                  Plan
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="ignf09o"
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="vojbsp9"
                >
                  Start Date
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="1u-.6wi"
                >
                  Next Billing
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="k-:pn:i"
                >
                  Amount
                </th>
                <th
                  className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="gdf8sjv"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800" data-oid="b0ia:xh">
              {filteredSubscriptions.length === 0 ? (
                <tr data-oid="8:w.f38">
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-400"
                    data-oid="ld420.l"
                  >
                    No subscriptions found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-space-800/50"
                    data-oid="hk:ao0u"
                  >
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="th3:824"
                    >
                      <div className="flex items-center" data-oid="ap62s7d">
                        <div
                          className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white"
                          data-oid="w45--3o"
                        >
                          {sub.user.name.charAt(0)}
                        </div>
                        <div className="ml-3" data-oid="7pn2yry">
                          <p
                            className="text-sm font-medium text-white"
                            data-oid="4cf9p3g"
                          >
                            {sub.user.name}
                          </p>
                          <p
                            className="text-xs text-gray-400"
                            data-oid="l32pdy."
                          >
                            {sub.user.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="aeca7s."
                    >
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getPlanColor(sub.plan)}`}
                        data-oid="lc1t_a0"
                      >
                        {sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="3.j4z33"
                    >
                      <span
                        className={`text-xs px-2 py-1 rounded border font-medium flex items-center w-fit ${getStatusColor(sub.status)}`}
                        data-oid="lezugf3"
                      >
                        {getStatusIcon(sub.status)}
                        <span className="ml-1.5" data-oid=".0r-7ua">
                          {sub.status === "past_due"
                            ? "Past Due"
                            : sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                      data-oid="ane3j7d"
                    >
                      <div className="flex items-center" data-oid="of0x90u">
                        <Calendar
                          className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                          data-oid="np-l9zn"
                        />

                        {sub.startDate}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                      data-oid="p_pmgzx"
                    >
                      {sub.nextBilling === "N/A" ? (
                        <span className="text-gray-500" data-oid="gh3-sko">
                          N/A
                        </span>
                      ) : (
                        <div className="flex items-center" data-oid="2:krcjr">
                          <Calendar
                            className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                            data-oid="csr70o_"
                          />

                          {sub.nextBilling}
                        </div>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="4twobkv"
                    >
                      <div
                        className="flex items-center text-sm"
                        data-oid="rhrzzu9"
                      >
                        {sub.amount !== "Free" && (
                          <DollarSign
                            className="h-3.5 w-3.5 mr-0.5 text-green-400"
                            data-oid="c6x.82."
                          />
                        )}
                        <span
                          className={
                            sub.amount === "Free"
                              ? "text-gray-400"
                              : "text-green-400 font-medium"
                          }
                          data-oid="vi05027"
                        >
                          {sub.amount}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
                      data-oid="p:e7zgv"
                    >
                      <div
                        className="flex justify-end space-x-2"
                        data-oid="-ab01s-"
                      >
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-blue-400 hover:bg-space-700 transition-colors"
                          data-oid="ln:c-1:"
                        >
                          <Edit className="h-4 w-4" data-oid="je4xv5x" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-red-400 hover:bg-space-700 transition-colors"
                          onClick={() => deleteSubscription(sub.id)}
                          disabled={sub.status === "canceled"}
                          data-oid="05923r7"
                        >
                          <Trash className="h-4 w-4" data-oid="or3q7zb" />
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
          data-oid="y-3fw98"
        >
          <div className="text-sm text-gray-400" data-oid="cej_kpy">
            Showing{" "}
            <span className="font-medium text-white" data-oid="j:whug3">
              {filteredSubscriptions.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-white" data-oid="g17bf12">
              {subscriptions.length}
            </span>{" "}
            subscriptions
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div data-oid="ps2schg">
        <h3
          className="text-lg font-medium text-white mb-4 flex items-center"
          data-oid="294c98b"
        >
          <Shield className="h-4 w-4 mr-2 text-cyan" data-oid="fyd9n-w" />
          Subscription Plans
        </h3>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
          data-oid="q2610ai"
        >
          {subscriptionPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-space-900 rounded-xl p-5 glass-card relative ${
                plan.popular
                  ? "border-cyan border-opacity-40 shadow-glow-sm"
                  : ""
              }`}
              data-oid="tx0-fo."
            >
              {plan.popular && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 bg-cyan text-space-900 text-xs font-bold rounded-tr-xl rounded-bl-xl"
                  data-oid="m.vknx0"
                >
                  Popular
                </div>
              )}
              <h4 className="text-lg font-bold text-white" data-oid="1roxsfs">
                {plan.name}
              </h4>
              <p className="text-sm text-gray-400 mb-3" data-oid="kp-cd-f">
                {plan.description}
              </p>

              <div className="mb-4" data-oid="cjvxt.9">
                <span
                  className="text-2xl font-bold text-white"
                  data-oid="g70dph7"
                >
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400" data-oid="rz5r3y2">
                  {" "}
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-2 mb-4" data-oid="mobjxpl">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start" data-oid="i66fa3o">
                    <CheckCircle
                      className="h-4 w-4 text-cyan mt-0.5 mr-2 flex-shrink-0"
                      data-oid="ddku1vw"
                    />

                    <span className="text-sm text-gray-300" data-oid="-lb-f3j">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-cyan text-white hover:text-cyan"
                data-oid="k0n9ijh"
              >
                Edit Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Help text */}
      <div
        className="p-4 bg-space-800/70 rounded-lg border border-gray-700"
        data-oid="o3i11zj"
      >
        <div className="flex" data-oid="gjhnjeh">
          <div className="flex-shrink-0" data-oid="lwub4nk">
            <Users className="h-5 w-5 text-cyan" data-oid="sk2t4l2" />
          </div>
          <div className="ml-3" data-oid="jhzhuwt">
            <h3 className="text-sm font-medium text-white" data-oid="7dkzkyb">
              Subscription Management
            </h3>
            <p className="mt-1 text-sm text-gray-400" data-oid="ypapuj0">
              Manage user subscriptions and payment plans. You can view, create,
              modify, and cancel subscriptions. Track subscription statuses and
              due dates, and update plan features as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
