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
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="a9a09g1" />
        );

      case "trialing":
        return <Clock className="h-4 w-4 text-blue-400" data-oid="8wjxtdo" />;
      case "past_due":
        return (
          <AlertCircle className="h-4 w-4 text-orange-400" data-oid="7g:4sb4" />
        );

      case "canceled":
        return <XCircle className="h-4 w-4 text-gray-400" data-oid="3qj:j:y" />;
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
    <div className="space-y-6" data-oid="d8:nrkc">
      <div
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        data-oid="b_z_klg"
      >
        <h2
          className="text-xl font-bold text-white flex items-center"
          data-oid="4k-akul"
        >
          <CreditCard className="h-5 w-5 mr-2 text-cyan" data-oid=":cxilim" />
          Subscription Management
        </h2>

        <div className="flex gap-2" data-oid="e2y4bku">
          <div className="relative" data-oid="mjsjsd:">
            <select
              className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              data-oid="zjpoynw"
            >
              <option value="" data-oid="_ii6o1r">
                All Plans
              </option>
              <option value="free" data-oid="12rbe0p">
                Free
              </option>
              <option value="basic" data-oid=":bas5-i">
                Basic
              </option>
              <option value="professional" data-oid="0x0-qph">
                Professional
              </option>
              <option value="enterprise" data-oid="cgv_c2b">
                Enterprise
              </option>
            </select>
            <ChevronDown
              className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
              data-oid="f.c43tm"
            />
          </div>

          <div className="relative" data-oid="7y-yv_r">
            <select
              className="appearance-none bg-space-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full md:w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              data-oid="z7o62gd"
            >
              <option value="" data-oid="wbouf3c">
                All Status
              </option>
              <option value="active" data-oid="p0wq4d9">
                Active
              </option>
              <option value="trialing" data-oid="4rkiy_o">
                Trialing
              </option>
              <option value="past_due" data-oid="vmf8vom">
                Past Due
              </option>
              <option value="canceled" data-oid="ogwzgpm">
                Canceled
              </option>
            </select>
            <ChevronDown
              className="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
              data-oid="s160v_j"
            />
          </div>

          <button
            className="btn-glow btn-glow-cyan bg-purple-900 text-cyan px-3 py-2 rounded-lg flex items-center"
            data-oid="3e65:4m"
          >
            <PlusCircle className="h-4 w-4 mr-1.5" data-oid="e6j0xxf" />
            New Subscription
          </button>
        </div>
      </div>

      {/* Current Subscriptions */}
      <div
        className="bg-space-900 rounded-xl overflow-hidden glass-card"
        data-oid=".7tanmg"
      >
        <div className="overflow-x-auto" data-oid="uobqxh4">
          <table className="w-full" data-oid="drfj8st">
            <thead data-oid="efyq66r">
              <tr
                className="bg-space-800 border-b border-gray-700"
                data-oid="w1220k-"
              >
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="lpc7w3j"
                >
                  User
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="im:8fgs"
                >
                  Plan
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="fn1otqd"
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="3rg:2so"
                >
                  Start Date
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="k3ktkvx"
                >
                  Next Billing
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="qtly9dd"
                >
                  Amount
                </th>
                <th
                  className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  data-oid="m:8cj5."
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800" data-oid="kc-:.jz">
              {filteredSubscriptions.length === 0 ? (
                <tr data-oid="fxx6nwd">
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-400"
                    data-oid="n45umgi"
                  >
                    No subscriptions found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-space-800/50"
                    data-oid="4bfyn2s"
                  >
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="9u29-ca"
                    >
                      <div className="flex items-center" data-oid="iv7n15d">
                        <div
                          className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white"
                          data-oid="rz2vqyr"
                        >
                          {sub.user.name.charAt(0)}
                        </div>
                        <div className="ml-3" data-oid=".klf4ua">
                          <p
                            className="text-sm font-medium text-white"
                            data-oid="nakmkvs"
                          >
                            {sub.user.name}
                          </p>
                          <p
                            className="text-xs text-gray-400"
                            data-oid="8hr8l3i"
                          >
                            {sub.user.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="4ful1jn"
                    >
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getPlanColor(sub.plan)}`}
                        data-oid="dnif5z1"
                      >
                        {sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="3txekx."
                    >
                      <span
                        className={`text-xs px-2 py-1 rounded border font-medium flex items-center w-fit ${getStatusColor(sub.status)}`}
                        data-oid="nzbh.d8"
                      >
                        {getStatusIcon(sub.status)}
                        <span className="ml-1.5" data-oid="8i5af2u">
                          {sub.status === "past_due"
                            ? "Past Due"
                            : sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                      data-oid="8-2r-a8"
                    >
                      <div className="flex items-center" data-oid="7s.rqds">
                        <Calendar
                          className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                          data-oid="29-6jpi"
                        />

                        {sub.startDate}
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                      data-oid="0rdkrcw"
                    >
                      {sub.nextBilling === "N/A" ? (
                        <span className="text-gray-500" data-oid="nyq.qdg">
                          N/A
                        </span>
                      ) : (
                        <div className="flex items-center" data-oid="qodsi9x">
                          <Calendar
                            className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                            data-oid="unf__y3"
                          />

                          {sub.nextBilling}
                        </div>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      data-oid="dpd_361"
                    >
                      <div
                        className="flex items-center text-sm"
                        data-oid="org0amj"
                      >
                        {sub.amount !== "Free" && (
                          <DollarSign
                            className="h-3.5 w-3.5 mr-0.5 text-green-400"
                            data-oid=".zx_v.m"
                          />
                        )}
                        <span
                          className={
                            sub.amount === "Free"
                              ? "text-gray-400"
                              : "text-green-400 font-medium"
                          }
                          data-oid="cm8e4sa"
                        >
                          {sub.amount}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
                      data-oid="1fp0sd0"
                    >
                      <div
                        className="flex justify-end space-x-2"
                        data-oid="5p73p4n"
                      >
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-blue-400 hover:bg-space-700 transition-colors"
                          data-oid="k5if24n"
                        >
                          <Edit className="h-4 w-4" data-oid=".lm46w8" />
                        </button>
                        <button
                          className="p-1.5 rounded-md bg-space-800 text-red-400 hover:bg-space-700 transition-colors"
                          onClick={() => deleteSubscription(sub.id)}
                          disabled={sub.status === "canceled"}
                          data-oid="0j0d3yz"
                        >
                          <Trash className="h-4 w-4" data-oid="8.jbutv" />
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
          data-oid="f.ylexo"
        >
          <div className="text-sm text-gray-400" data-oid="2558vjh">
            Showing{" "}
            <span className="font-medium text-white" data-oid="bhcdo2w">
              {filteredSubscriptions.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-white" data-oid="gdpwfm-">
              {subscriptions.length}
            </span>{" "}
            subscriptions
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div data-oid="drm1-.p">
        <h3
          className="text-lg font-medium text-white mb-4 flex items-center"
          data-oid="an4uaid"
        >
          <Shield className="h-4 w-4 mr-2 text-cyan" data-oid="g.ibiir" />
          Subscription Plans
        </h3>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
          data-oid="o8:s-2y"
        >
          {subscriptionPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-space-900 rounded-xl p-5 glass-card relative ${
                plan.popular
                  ? "border-cyan border-opacity-40 shadow-glow-sm"
                  : ""
              }`}
              data-oid="0y7e5j2"
            >
              {plan.popular && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 bg-cyan text-space-900 text-xs font-bold rounded-tr-xl rounded-bl-xl"
                  data-oid="lvk62-o"
                >
                  Popular
                </div>
              )}
              <h4 className="text-lg font-bold text-white" data-oid="xnl2vbq">
                {plan.name}
              </h4>
              <p className="text-sm text-gray-400 mb-3" data-oid="c4ofjld">
                {plan.description}
              </p>

              <div className="mb-4" data-oid="mpejwb8">
                <span
                  className="text-2xl font-bold text-white"
                  data-oid="uw5_lq3"
                >
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400" data-oid="-mmf2ow">
                  {" "}
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-2 mb-4" data-oid="a:5ofiq">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start" data-oid="bjd79l_">
                    <CheckCircle
                      className="h-4 w-4 text-cyan mt-0.5 mr-2 flex-shrink-0"
                      data-oid="ups3e8x"
                    />

                    <span className="text-sm text-gray-300" data-oid="gvvn_us">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-cyan text-white hover:text-cyan"
                data-oid="tdbwv2f"
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
        data-oid="df7khyt"
      >
        <div className="flex" data-oid="qjztnar">
          <div className="flex-shrink-0" data-oid="15jk5vd">
            <Users className="h-5 w-5 text-cyan" data-oid="qxpb0zz" />
          </div>
          <div className="ml-3" data-oid="e-c5_62">
            <h3 className="text-sm font-medium text-white" data-oid="7ibfa4b">
              Subscription Management
            </h3>
            <p className="mt-1 text-sm text-gray-400" data-oid=":djhn3g">
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
