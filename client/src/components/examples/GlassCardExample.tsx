import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";

const GlassCardExample: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(true);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 bg-space-950 min-h-screen" data-oid="ejf7xc6">
      <h1 className="text-2xl font-space text-white mb-8" data-oid="ouesa44">
        Glass Card Examples
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-oid="8bm5e:_"
      >
        {/* Basic Card */}
        <GlassCard
          title="Standard Card"
          subtitle="Basic configuration"
          icon="fas fa-star"
          data-oid="gb58zhu"
        >
          <p className="text-gray-300" data-oid="fghm.ds">
            This is a standard glass card with title, subtitle and icon.
          </p>
        </GlassCard>

        {/* Interactive Card with Ripple */}
        <GlassCard
          title="Interactive Card"
          subtitle="With ripple effect"
          icon="fas fa-hand-pointer"
          variant="electric"
          glow={true}
          onClick={() => alert("Card clicked!")}
          data-oid="5fkt1kb"
        >
          <p className="text-gray-300" data-oid="5cfb-8z">
            Click anywhere on this card to see the ripple effect and trigger an
            action.
          </p>
        </GlassCard>

        {/* Loading State Card */}
        <GlassCard
          title="Loading State"
          subtitle="Shows a loading spinner"
          icon="fas fa-sync"
          variant="teal"
          loading={loading}
          footerContent={
            <button
              onClick={simulateLoading}
              className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-md hover:bg-teal-500/30 transition-colors"
              data-oid=":0ippe:"
            >
              Simulate Loading
            </button>
          }
          data-oid=".q0kstt"
        >
          <p className="text-gray-300" data-oid="k2wqll0">
            Click the button below to see the loading state in action.
          </p>
        </GlassCard>

        {/* Expandable Card */}
        <GlassCard
          title="Expandable Content"
          subtitle="Click the chevron to toggle"
          icon="fas fa-box"
          variant="purple"
          expandable={true}
          initiallyExpanded={cardExpanded}
          accentCorner="top-right"
          data-oid=":yoi3g7"
        >
          <div className="space-y-4" data-oid="c3u.p.1">
            <p className="text-gray-300" data-oid="znwlzpz">
              This card can be collapsed and expanded using the button in the
              top-right corner.
            </p>
            <p className="text-gray-300" data-oid="-yprrl2">
              This feature is useful for hiding complex or lengthy content until
              needed.
            </p>
            <p className="text-gray-300" data-oid="hcy_mjc">
              Notice how smoothly the animation works!
            </p>
          </div>
        </GlassCard>

        {/* Pulsing Border Card */}
        <GlassCard
          title="Attention-Grabbing"
          subtitle="With pulsing border effect"
          icon="fas fa-bell"
          variant="cyan"
          pulseBorder={true}
          glow={true}
          accentCorner="bottom-right"
          data-oid="_.vxiv."
        >
          <p className="text-gray-300" data-oid="cs5j.2i">
            This card has a pulsing border to draw attention to important
            content. It also has an accent corner decoration.
          </p>
        </GlassCard>

        {/* Non-Interactive Card */}
        <GlassCard
          title="Static Card"
          subtitle="No interaction effects"
          icon="fas fa-lock"
          variant="default"
          interactive={false}
          contentPadding="lg"
          data-oid="gzodv2z"
        >
          <p className="text-gray-300" data-oid="cv.gauu">
            This card is non-interactive - it won't respond to clicks or show
            hover effects. It also has larger padding.
          </p>
        </GlassCard>
      </div>

      {/* Card with custom height and footer */}
      <div className="mt-6" data-oid="lecpjfb">
        <GlassCard
          title="Map View"
          subtitle="Suppliers Near You"
          icon="fas fa-map-marker-alt"
          variant="cyan"
          minHeight="300px"
          footerContent={
            <div
              className="flex justify-between items-center"
              data-oid="uwvzj:z"
            >
              <span className="text-xs text-gray-400" data-oid="0sbvxzg">
                Last updated: Today
              </span>
              <button
                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-md hover:bg-cyan-500/30 transition-colors"
                data-oid="jg2rb_x"
              >
                Expand Map
              </button>
            </div>
          }
          data-oid="ege0:iz"
        >
          <div
            className="h-full flex items-center justify-center bg-space-900/50 rounded-lg"
            data-oid="ontzurv"
          >
            <div className="text-center" data-oid="egs4.is">
              <i
                className="fas fa-map-marked-alt text-4xl text-cyan-400 mb-3"
                data-oid="6e0p.yk"
              ></i>
              <p className="text-gray-300" data-oid="id:3okl">
                Interactive map would display here
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default GlassCardExample;
