import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import AIRecommendationsPanel from "@/components/AIRecommendationsPanel";
import MaterialRecommendations from "@/components/MaterialRecommendations";

const Resources: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "guides",
      name: "Technical Guides",
      icon: "fas fa-book",
      color: "electric",
      border: "neon-border-blue",
    },
    {
      id: "standards",
      name: "Standards",
      icon: "fas fa-check-square",
      color: "teal",
      border: "neon-border-teal",
    },
    {
      id: "safety",
      name: "Health & Safety",
      icon: "fas fa-hard-hat",
      color: "yellow-400",
      border: "neon-border-yellow",
    },
    {
      id: "codes",
      name: "Building Codes",
      icon: "fas fa-book-open",
      color: "cyan",
      border: "neon-border-cyan",
    },
    {
      id: "systems",
      name: "Building Systems",
      icon: "fas fa-tools",
      color: "green-400",
      border: "neon-border-green",
    },
    {
      id: "materials",
      name: "Materials",
      icon: "fas fa-cubes",
      color: "electric",
      border: "neon-border-blue",
    },
    {
      id: "certification",
      name: "Certification",
      icon: "fas fa-certificate",
      color: "purple-400",
      border: "neon-border-purple",
    },
    {
      id: "tools",
      name: "Digital Tools",
      icon: "fas fa-laptop-code",
      color: "cyan",
      border: "neon-border-cyan",
    },
  ];

  const resources = [
    // Technical Guides
    {
      id: 1,
      title: "Mitek Engineering Guide",
      url: "https://mitek.co.nz/resources/publications/",
      category: "guides",
      updated: "May 2025",
      icon: "fas fa-book",
      color: "electric",
      description:
        "Comprehensive engineering guide for Mitek truss and frame systems, with sizing tables, connection details, and installation best practices.",
    },
    {
      id: 2,
      title: "GIB® Fixing & Stopping Guide",
      url: "https://www.gib.co.nz/systems/gib-site-guide/",
      category: "guides",
      updated: "March 2025",
      icon: "fas fa-square",
      color: "cyan",
      description:
        "Official guidelines for GIB® plasterboard fixing, stopping, and finishing, including fire and acoustic systems.",
    },
    {
      id: 3,
      title: "NZ Stair Design Guide",
      url: "https://www.building.govt.nz/",
      category: "guides",
      updated: "April 2025",
      icon: "fas fa-stairs",
      color: "teal",
      description:
        "Guide for designing and building code-compliant stairs for residential and commercial buildings.",
    },
    {
      id: 4,
      title: "Concrete Masonry Manual",
      url: "https://www.ccanz.org.nz/page/publications/",
      category: "guides",
      updated: "Feb 2025",
      icon: "fas fa-cubes",
      color: "yellow-400",
      description:
        "Complete reference manual for concrete masonry construction in New Zealand.",
    },
    {
      id: 5,
      title: "BRANZ Good Practice Guide - Roof Cladding",
      url: "https://www.branz.co.nz/shop/branz-good-practice-guides/",
      category: "guides",
      updated: "Jan 2025",
      icon: "fas fa-home",
      color: "red-400",
      description:
        "BRANZ best practice guidelines for installing metal roof cladding systems.",
    },

    // Health & Safety
    {
      id: 6,
      title: "WorkSafe NZ Construction Guidelines",
      url: "https://www.worksafe.govt.nz/topic-and-industry/construction/",
      category: "safety",
      updated: "May 2025",
      icon: "fas fa-hard-hat",
      color: "yellow-400",
      description:
        "Official WorkSafe NZ guidelines for construction safety practices and compliance.",
    },
    {
      id: 7,
      title: "Site Safe Resources",
      url: "https://www.sitesafe.org.nz/guides--resources/",
      category: "safety",
      updated: "April 2025",
      icon: "fas fa-shield-alt",
      color: "green-400",
      description:
        "Comprehensive safety resources, toolbox talks, and forms from Site Safe NZ.",
    },
    {
      id: 8,
      title: "Height Safety Guidelines",
      url: "https://www.worksafe.govt.nz/topic-and-industry/working-at-height/",
      category: "safety",
      updated: "March 2025",
      icon: "fas fa-arrow-up",
      color: "red-400",
      description:
        "Working at height safety requirements, including scaffold and ladder safety.",
    },
    {
      id: 9,
      title: "Asbestos Management Guide",
      url: "https://www.worksafe.govt.nz/topic-and-industry/asbestos/",
      category: "safety",
      updated: "Feb 2025",
      icon: "fas fa-biohazard",
      color: "red-500",
      description:
        "Guidelines for identifying, managing, and safely removing asbestos on construction sites.",
    },

    // Building Codes
    {
      id: 10,
      title: "NZ Building Code E2/AS1 (External Moisture)",
      url: "https://www.building.govt.nz/building-code-compliance/",
      category: "codes",
      updated: "April 2025",
      icon: "fas fa-file-alt",
      color: "blue-400",
      description:
        "Acceptable Solution for External Moisture, covering weather-tightness requirements.",
    },
    {
      id: 11,
      title: "Building Code Handbook",
      url: "https://www.building.govt.nz/building-code-compliance/",
      category: "codes",
      updated: "Jan 2025",
      icon: "fas fa-book-open",
      color: "cyan",
      description:
        "Complete New Zealand Building Code handbook with all compliance documents.",
    },
    {
      id: 12,
      title: "NZS 3604 Timber-framed Buildings",
      url: "https://www.standards.govt.nz/",
      category: "standards",
      updated: "March 2025",
      icon: "fas fa-check-square",
      color: "teal",
      description:
        "The key standard for timber-framed building design and construction in New Zealand.",
    },
    {
      id: 13,
      title: "G4 Ventilation Requirements",
      url: "https://www.building.govt.nz/building-code-compliance/g-services-and-facilities/g4-ventilation/",
      category: "codes",
      updated: "Feb 2025",
      icon: "fas fa-wind",
      color: "green-400",
      description:
        "Building code requirements for ventilation in residential and commercial buildings.",
    },

    // Building Systems
    {
      id: 14,
      title: "Mitek Roof Truss Systems",
      url: "https://mitek.co.nz/products/",
      category: "systems",
      updated: "May 2025",
      icon: "fas fa-tools",
      color: "electric",
      description:
        "Design and installation information for Mitek engineered roof truss systems.",
    },
    {
      id: 15,
      title: "Pryda Frame and Truss Guide",
      url: "https://www.pryda.co.nz/products/",
      category: "systems",
      updated: "April 2025",
      icon: "fas fa-wrench",
      color: "orange-400",
      description:
        "Technical information for Pryda engineered timber framing solutions.",
    },
    {
      id: 16,
      title: "James Hardie Cladding Systems",
      url: "https://www.jameshardie.co.nz/specifiers/",
      category: "systems",
      updated: "March 2025",
      icon: "fas fa-th-large",
      color: "blue-400",
      description:
        "Design and installation guides for James Hardie exterior cladding systems.",
    },
    {
      id: 17,
      title: "Concrete Floor Systems",
      url: "https://www.ccanz.org.nz/",
      category: "systems",
      updated: "Feb 2025",
      icon: "fas fa-th",
      color: "gray-400",
      description:
        "Standards and guidelines for concrete flooring systems including slab design.",
    },

    // Certification and Training
    {
      id: 18,
      title: "Licensed Building Practitioner Resources",
      url: "https://www.lbp.govt.nz/",
      category: "certification",
      updated: "May 2025",
      icon: "fas fa-id-badge",
      color: "purple-400",
      description:
        "Resources for obtaining and maintaining Licensed Building Practitioner status.",
    },
    {
      id: 19,
      title: "BCITO Training Modules",
      url: "https://bcito.org.nz/apprentices/",
      category: "certification",
      updated: "April 2025",
      icon: "fas fa-user-graduate",
      color: "blue-500",
      description:
        "Building and Construction Industry Training Organization modules and certification paths.",
    },

    // Digital Tools
    {
      id: 20,
      title: "Mitek 20/20 Software",
      url: "https://mitek.co.nz/software/",
      category: "tools",
      updated: "May 2025",
      icon: "fas fa-laptop-code",
      color: "cyan",
      description:
        "Professional design software for timber frame and truss systems from Mitek.",
    },
    {
      id: 21,
      title: "BRANZ Artisan Tools",
      url: "https://www.branz.co.nz/calculators-tools/",
      category: "tools",
      updated: "April 2025",
      icon: "fas fa-calculator",
      color: "red-400",
      description:
        "Digital tools for building calculations, compliance, and assessment.",
    },
    {
      id: 22,
      title: "NZ Building Consent Portal",
      url: "https://www.building.govt.nz/",
      category: "tools",
      updated: "March 2025",
      icon: "fas fa-file-signature",
      color: "green-400",
      description:
        "Portal for submitting and tracking building consent applications.",
    },
  ];

  // Filter resources based on active category and search query
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      !activeCategory || resource.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pick featured resources (most recent from each category)
  const featuredResources = categories
    .map((category) => {
      const categoryResources = resources.filter(
        (r) => r.category === category.id,
      );
      return categoryResources.length > 0 ? categoryResources[0] : null;
    })
    .filter(Boolean);

  return (
    <main
      className="container mx-auto px-6 py-10"
      data-component-name="Resources"
      data-oid="t-5rjv_"
    >
      {/* Professional header section with search */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
        data-oid="kjen1bl"
      >
        <div className="relative mb-6 md:mb-0" data-oid="v.9eac6">
          <div
            className="absolute -left-4 -top-3 w-16 h-16 bg-cyan/5 rounded-full blur-xl -z-10"
            data-oid="i62k:eq"
          ></div>
          <h2
            className="text-3xl font-space font-bold text-white relative inline-flex flex-col"
            data-oid="vqpu1:1"
          >
            <div className="flex items-center" data-oid="puf:2xz">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-electric mr-2"
                data-oid="ea7ge7j"
              >
                NZ
              </span>
              <span data-oid="0n9cm:.">Building Resources</span>
              <div
                className="ml-3 px-2 py-0.5 bg-cyan/10 text-cyan text-sm rounded-md font-normal hidden md:block"
                data-oid="imyn8r."
              >
                {resources.length} Resources
              </div>
            </div>
            <span
              className="h-1 w-32 bg-gradient-to-r from-cyan to-electric rounded-full mt-2"
              data-oid="ndphfb-"
            ></span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl" data-oid="n46x5_i">
            Professional reference materials, technical documentation, and
            official guides for construction in New Zealand.
          </p>
        </div>

        <div className="relative w-full md:w-72 lg:w-96" data-oid="wf_q7am">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-electric/20 rounded-lg blur-lg opacity-30"
            data-oid="5ra5-dh"
          ></div>
          <div className="relative" data-oid="iq6sfp7">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-space-900/70 border border-cyan/30 focus:border-cyan/60 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan/30 shadow-sm shadow-cyan/10"
              data-oid="eh4-:.o"
            />

            <div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan/70"
              data-oid="o5copu6"
            >
              <i className="fas fa-search" data-oid="1koa197"></i>
            </div>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                data-oid=".1rdb:k"
              >
                <i className="fas fa-times" data-oid="wyz-9t3"></i>
              </button>
            ) : (
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs"
                data-oid="-d_mv.6"
              >
                Type to search
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-20 right-10 w-32 h-32 bg-cyan/5 rounded-full blur-3xl -z-10 animate-pulse"
        data-oid="h-tj25k"
      ></div>
      <div
        className="absolute bottom-20 left-10 w-40 h-40 bg-electric/5 rounded-full blur-3xl -z-10 animate-pulse"
        data-oid="0vqb_z0"
      ></div>

      {/* AI Advisor Sections */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        data-oid="gh1y3jd"
      >
        <AIRecommendationsPanel data-oid="r_zasw-" />
        <MaterialRecommendations data-oid="jmrb5zv" />
      </div>

      {/* Category Selection - Enhanced Professional Version */}
      <GlassCard
        className="p-8 mb-10 border-cyan/30 backdrop-blur-xl shadow-lg shadow-cyan/5 overflow-hidden relative"
        data-oid="hanotn:"
      >
        {/* Background accent elements */}
        <div
          className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-electric/10 to-transparent rounded-full blur-3xl -z-10"
          data-oid="4uh2qf2"
        ></div>
        <div
          className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-cyan/10 to-transparent rounded-full blur-3xl -z-10"
          data-oid="rqe3m:2"
        ></div>

        <div className="flex items-center mb-8" data-oid="z9lkwf7">
          <div
            className="h-12 w-1.5 bg-gradient-to-b from-cyan via-electric to-transparent rounded-full mr-4"
            data-oid="1r7bc.l"
          ></div>
          <div data-oid="oxpsaaj">
            <h3
              className="text-2xl font-semibold text-white"
              data-oid="s5v4plb"
            >
              Resource Categories
            </h3>
            <p className="text-gray-400 text-sm mt-1" data-oid=".qo1-i.">
              Select a category to filter available resources
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4"
          data-oid="lc7h57o"
        >
          <div
            key="all"
            className={`flex flex-col items-center justify-center p-5 rounded-xl
              transition-all duration-300 cursor-pointer group relative overflow-hidden
              ${
                !activeCategory
                  ? "bg-gradient-to-br from-space-800 to-space-700 border border-cyan/40 shadow-lg shadow-cyan/10"
                  : "bg-space-900/80 hover:bg-space-800 border border-space-700/60 hover:border-cyan/30"
              }
            `}
            onClick={() => setActiveCategory(null)}
            data-oid="qz:quy."
          >
            {/* Hover highlight effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              data-oid="oupvl2a"
            ></div>

            {!activeCategory && (
              <div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
                data-oid="-ka28e7"
              ></div>
            )}

            <div
              className="relative z-10 flex items-center justify-center h-16 w-16 rounded-full mb-3
              bg-gradient-to-br from-space-800/90 to-space-900/90 border border-cyan/30
              group-hover:scale-110 group-hover:border-cyan/50 transform transition-all duration-300 ease-out"
              data-oid="o0ijwnw"
            >
              <i
                className="fas fa-th-large text-3xl text-cyan group-hover:text-white transition-colors duration-300"
                data-oid="-_f_d51"
              ></i>
            </div>

            <div className="relative z-10" data-oid="im-zd5e">
              <div
                className="text-base font-medium text-center text-white mb-1"
                data-oid="xy8z4gx"
              >
                All Resources
              </div>
              <div
                className="text-xs text-center px-2 py-0.5 bg-cyan/10 text-cyan rounded-full"
                data-oid="30heggr"
              >
                {resources.length} items
              </div>
            </div>
          </div>

          {categories.map((category) => {
            const count = resources.filter(
              (r) => r.category === category.id,
            ).length;
            const isActive = activeCategory === category.id;

            return (
              <div
                key={category.id}
                className={`flex flex-col items-center justify-center p-5 rounded-xl
                  transition-all duration-300 cursor-pointer relative overflow-hidden group
                  ${
                    isActive
                      ? `bg-gradient-to-br from-space-800 to-space-700 border border-${category.color}/40 shadow-lg shadow-${category.color}/10`
                      : "bg-space-900/80 hover:bg-space-800 border border-space-700/60 hover:border-space-600"
                  }
                `}
                onClick={() => setActiveCategory(isActive ? null : category.id)}
                data-oid="sqv9ino"
              >
                {/* Hover highlight effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${category.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  data-oid="e8-pi-a"
                ></div>

                {/* Top accent line */}
                {isActive && (
                  <div
                    className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${category.color} to-transparent`}
                    data-oid="o97azq7"
                  ></div>
                )}

                <div
                  className={`relative z-10 flex items-center justify-center h-16 w-16 rounded-full mb-3
                  bg-gradient-to-br from-space-800/90 to-space-900/90 border border-${category.color}/30
                  group-hover:scale-110 group-hover:border-${category.color}/50 transform transition-all duration-300 ease-out`}
                  data-oid="sy3pd8i"
                >
                  <i
                    className={`${category.icon} text-3xl text-${category.color} group-hover:text-white transition-colors duration-300`}
                    data-oid="4pjbsz1"
                  ></i>
                </div>

                <div className="relative z-10" data-oid="okd_n.5">
                  <div
                    className="text-base font-medium text-center text-white mb-1"
                    data-oid="jyb:g:2"
                  >
                    {category.name}
                  </div>
                  <div
                    className={`text-xs text-center px-2 py-0.5 bg-${category.color}/10 text-${category.color} rounded-full`}
                    data-oid="rgfgc61"
                  >
                    {count} items
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeCategory && (
          <div className="mt-6 flex justify-end" data-oid="wotdcr_">
            <button
              onClick={() => setActiveCategory(null)}
              className="px-4 py-2 rounded-lg text-sm bg-space-800/80 text-gray-300 hover:text-white hover:bg-space-700/80 border border-space-700/70 hover:border-cyan/30 transition-all duration-300 flex items-center"
              data-oid="tj-drt6"
            >
              <i className="fas fa-times mr-2" data-oid="ircfhqw"></i> Clear
              Filter
            </button>
          </div>
        )}
      </GlassCard>

      {/* Resources List - Enhanced Professional Version */}
      <GlassCard
        className="p-8 mb-10 border-cyan/30 backdrop-blur-xl shadow-lg shadow-cyan/5 relative overflow-hidden"
        data-oid="w6a0j0o"
      >
        {/* Background accent element */}
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-space-700/30 to-transparent rounded-full blur-3xl -z-10"
          data-oid="wm2u:y."
        ></div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-space-700/70"
          data-oid="kkrvvct"
        >
          <div className="flex items-center mb-4 md:mb-0" data-oid="e91..07">
            <div
              className="h-12 w-12 rounded-full bg-space-800 p-0.5 mr-4 relative"
              data-oid="m0.qf45"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan to-electric rounded-full opacity-30 animate-pulse"
                data-oid="o-pcy6t"
              ></div>
              <div
                className="h-full w-full rounded-full bg-space-900 flex items-center justify-center"
                data-oid="1s2ihzh"
              >
                <i
                  className="fas fa-book-open text-xl text-cyan"
                  data-oid="57op37c"
                ></i>
              </div>
            </div>
            <div data-oid="p2d-b6c">
              <h3 className="text-2xl font-bold text-white" data-oid="kijqdya">
                {activeCategory
                  ? `${categories.find((c) => c.id === activeCategory)?.name} Resources`
                  : "All Building Resources"}
              </h3>
              <div
                className="flex items-center mt-1.5 space-x-3"
                data-oid="vf0aons"
              >
                <div
                  className="px-2.5 py-0.5 bg-space-800/80 text-cyan text-sm rounded-full flex items-center"
                  data-oid="luv2jlk"
                >
                  <i
                    className="fas fa-layer-group mr-1.5 text-xs"
                    data-oid="uhz1rao"
                  ></i>
                  <span data-oid="pjbu42q">
                    {filteredResources.length}{" "}
                    {filteredResources.length === 1 ? "resource" : "resources"}
                  </span>
                </div>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-sm text-gray-400 hover:text-cyan transition-colors flex items-center"
                    data-oid="4:ex022"
                  >
                    <i
                      className="fas fa-times-circle mr-1"
                      data-oid="hr_4vji"
                    ></i>{" "}
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className="flex items-center bg-space-800/70 rounded-full px-4 py-2 border border-space-700/70"
            data-oid="n-iqunm"
          >
            <i
              className="fas fa-lightbulb text-yellow-400 mr-2"
              data-oid="eg8__t8"
            ></i>
            <span className="text-sm text-gray-300" data-oid="g:s5uh2">
              Click any resource to open it
            </span>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="jhfsgc0"
          >
            {filteredResources.map((resource) => (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                key={resource.id}
                className={`
                  relative overflow-hidden rounded-xl border p-6 
                  bg-gradient-to-br from-space-900 to-space-800/90 
                  border-${resource.color}/30 hover:border-${resource.color}/60 
                  transition-all duration-300 hover:shadow-lg hover:shadow-${resource.color}/10 
                  hover:scale-[1.02] group cursor-pointer`}
                data-oid="7aji.-c"
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${resource.color} to-transparent`}
                  data-oid=".qrh3o5"
                ></div>

                {/* Ambient glow on hover */}
                <div
                  className={`absolute -left-10 -top-10 w-40 h-40 bg-${resource.color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  data-oid="swjnzpo"
                ></div>

                <div className="flex items-start mb-5" data-oid="cgdijpa">
                  <div
                    className={`
                    flex items-center justify-center h-14 w-14 rounded-full mr-4 flex-shrink-0
                    bg-gradient-to-br from-${resource.color}/20 via-${resource.color}/10 to-transparent 
                    border border-${resource.color}/40 group-hover:scale-110 transition-all duration-300
                    group-hover:border-${resource.color}/70 group-hover:shadow-sm group-hover:shadow-${resource.color}/30
                  `}
                    data-oid="whm3:ft"
                  >
                    <i
                      className={`${resource.icon} text-${resource.color} text-2xl`}
                      data-oid="xy2z81p"
                    ></i>
                  </div>

                  <div data-oid="n227-61">
                    <h4
                      className="text-xl font-semibold text-white group-hover:text-${resource.color} transition-colors duration-300"
                      data-oid="q2h-1:c"
                    >
                      {resource.title}
                    </h4>
                    <div
                      className="flex items-center flex-wrap mt-2 gap-2"
                      data-oid="r1:0nr9"
                    >
                      <span
                        className="px-2.5 py-0.5 bg-space-800/80 text-${resource.color} text-xs rounded-full border border-${resource.color}/20"
                        data-oid="izrs435"
                      >
                        {
                          categories.find((c) => c.id === resource.category)
                            ?.name
                        }
                      </span>
                      <span
                        className="text-xs text-gray-400 flex items-center"
                        data-oid="s_orkkz"
                      >
                        <i
                          className="fas fa-clock mr-1.5"
                          data-oid="b3x0i84"
                        ></i>{" "}
                        {resource.updated}
                      </span>
                    </div>
                  </div>
                </div>

                {resource.description && (
                  <div
                    className="px-4 py-3 bg-space-800/50 rounded-lg mb-4 border-l-2 border-${resource.color}/40"
                    data-oid="w23xple"
                  >
                    <p
                      className="text-gray-300 text-sm line-clamp-2"
                      data-oid="v2vdbg9"
                    >
                      {resource.description}
                    </p>
                  </div>
                )}

                <div
                  className="flex justify-between items-center mt-2"
                  data-oid=":1y8:k:"
                >
                  <div
                    className="text-xs text-gray-500 truncate max-w-[60%] opacity-70 group-hover:opacity-100 transition-opacity"
                    data-oid="rq1r3is"
                  >
                    <i className="fas fa-link mr-1" data-oid="30rs213"></i>
                    {resource.url.replace("https://www.", "")}
                  </div>
                  <div
                    className={`
                    flex items-center text-${resource.color} opacity-80 group-hover:opacity-100 
                    transform translate-x-0 group-hover:translate-x-1 transition-all duration-300
                  `}
                    data-oid="cgomkjg"
                  >
                    <span
                      className="mr-1 text-xs font-medium"
                      data-oid="9p9e2te"
                    >
                      Open
                    </span>
                    <i
                      className="fas fa-external-link-alt text-xs"
                      data-oid="v:k-m9j"
                    ></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-oid="ik9d8lv">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-space-800/70 mb-6"
              data-oid="-byp91a"
            >
              <i
                className="fas fa-search text-4xl text-gray-500"
                data-oid="2i7qaj0"
              ></i>
            </div>
            <h4
              className="text-2xl font-medium text-gray-400 mb-3"
              data-oid="tq48b0m"
            >
              No resources found
            </h4>
            <p
              className="text-gray-500 max-w-md mx-auto mb-6"
              data-oid="uils24w"
            >
              We couldn't find any resources matching your current filters. Try
              adjusting your search terms or category selection.
            </p>
            {(activeCategory || searchQuery) && (
              <button
                className="px-6 py-3 bg-space-800/80 text-cyan border border-cyan/30 rounded-lg hover:bg-space-700/80 hover:border-cyan/50 transition-all"
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery("");
                }}
                data-oid="70-:v6p"
              >
                <i className="fas fa-sync-alt mr-2" data-oid="7qwwr-5"></i>{" "}
                Reset Filters
              </button>
            )}
          </div>
        )}
      </GlassCard>

      {/* Featured Resources - Enhanced Professional Version */}
      <GlassCard
        className="p-8 border-purple-400/30 shadow-lg shadow-purple-400/5 relative overflow-hidden"
        data-oid="uarx_rn"
      >
        {/* Background elements */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent -z-10"
          data-oid="u_ceg__"
        ></div>
        <div
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"
          data-oid="e:5rh8g"
        ></div>

        <div className="flex items-center mb-8" data-oid="3b:6y-d">
          <div
            className="h-12 w-1.5 bg-gradient-to-b from-purple-400 via-electric to-transparent rounded-full mr-4"
            data-oid="dtc-wil"
          ></div>
          <div data-oid="_ur20-6">
            <h3
              className="text-2xl font-semibold text-white"
              data-oid="e-ecays"
            >
              Featured Resources
            </h3>
            <p className="text-gray-400 text-sm mt-1" data-oid="l.kau7w">
              Essential documentation for NZ construction projects
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          data-oid="0gzevlj"
        >
          {featuredResources.slice(0, 2).map((resource) => {
            // Ensure resource is not null before rendering
            if (!resource) return null;

            return (
              <div
                key={resource.id}
                className="relative rounded-xl bg-space-900/90 border border-${resource.color}/30 hover:border-${resource.color}/50 transition-all duration-300 overflow-hidden group"
                data-oid="-0yfmqw"
              >
                {/* Accent top edge */}
                <div
                  className={`h-1 w-full bg-gradient-to-r from-${resource.color}/70 to-transparent`}
                  data-oid="kd1-vh1"
                ></div>

                <div className="p-6" data-oid="cilkq4t">
                  <div className="flex items-center mb-5" data-oid="bamnl5f">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-${resource.color}/30 to-transparent flex items-center justify-center mr-5 border border-${resource.color}/40 group-hover:scale-105 transition-transform duration-300`}
                      data-oid="la7363-"
                    >
                      <i
                        className={`${resource.icon} text-${resource.color} text-2xl`}
                        data-oid="exbn5h2"
                      ></i>
                    </div>
                    <div data-oid="lusixt9">
                      <h4
                        className="text-xl font-semibold text-white group-hover:text-${resource.color} transition-colors duration-300"
                        data-oid="96iln-r"
                      >
                        {resource.title}
                      </h4>
                      <div
                        className="flex items-center mt-1.5"
                        data-oid="jje5wst"
                      >
                        <span
                          className={`px-2.5 py-0.5 bg-${resource.color}/10 text-${resource.color} text-xs rounded-full mr-3`}
                          data-oid="ss3hqfb"
                        >
                          {
                            categories.find((c) => c.id === resource.category)
                              ?.name
                          }
                        </span>
                        <span
                          className="text-xs text-gray-400"
                          data-oid="r5.vaju"
                        >
                          Updated {resource.updated}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="px-5 py-4 bg-space-800/70 rounded-lg mb-5 border-l-2 border-${resource.color}/40"
                    data-oid="g6n3kl."
                  >
                    <p className="text-gray-300 text-sm" data-oid="bwnj_wq">
                      {resource.description}
                    </p>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-full flex items-center justify-center py-3 rounded-lg 
                      bg-gradient-to-r from-${resource.color}/20 to-${resource.color}/10 text-${resource.color} 
                      border border-${resource.color}/40 hover:border-${resource.color}/60 
                      hover:shadow-lg hover:shadow-${resource.color}/10 transition-all duration-300
                      font-medium group-hover:bg-${resource.color}/30
                    `}
                    data-oid="i9p0980"
                  >
                    <i
                      className="fas fa-external-link-alt mr-2"
                      data-oid="0-mw-v7"
                    ></i>{" "}
                    Visit Resource
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </main>
  );
};

export default Resources;
