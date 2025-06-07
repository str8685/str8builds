import { FC, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import GlassCard from "../ui/GlassCard";

// Define supplier options with prices
const SUPPLIERS = [
  { id: "supplier1", name: "STR8 Building Supplies", priceMultiplier: 1.0 },
  { id: "supplier2", name: "Discount Materials", priceMultiplier: 0.85 },
  { id: "supplier3", name: "Premium Building Co", priceMultiplier: 1.15 },
  { id: "supplier4", name: "Local Hardware", priceMultiplier: 0.95 },
];

// Material categories
const CATEGORIES = [
  { id: "framing", name: "Framing & Structural" },
  { id: "drywall", name: "Drywall & Finishing" },
  { id: "concrete", name: "Concrete & Foundation" },
  { id: "roofing", name: "Roofing Materials" },
  { id: "electrical", name: "Electrical" },
  { id: "plumbing", name: "Plumbing" },
  { id: "flooring", name: "Flooring & Tile" },
  { id: "painting", name: "Paint & Supplies" },
];

// Base material pricing
const MATERIALS = [
  // Framing & Structural
  {
    id: "lumber2x4",
    name: "2x4 Lumber (8ft)",
    category: "framing",
    unit: "piece",
    basePrice: 5.45,
    unit_type: "ea",
  },
  {
    id: "lumber2x6",
    name: "2x6 Lumber (8ft)",
    category: "framing",
    unit: "piece",
    basePrice: 9.25,
    unit_type: "ea",
  },
  {
    id: "plywood34",
    name: '3/4" Plywood (4x8)',
    category: "framing",
    unit: "sheet",
    basePrice: 38.95,
    unit_type: "ea",
  },
  {
    id: "osb716",
    name: '7/16" OSB (4x8)',
    category: "framing",
    unit: "sheet",
    basePrice: 24.75,
    unit_type: "ea",
  },
  {
    id: "lvl12",
    name: 'LVL Beam (1.75"x11.875")',
    category: "framing",
    unit: "linear ft",
    basePrice: 12.5,
    unit_type: "ft",
  },

  // Drywall & Finishing
  {
    id: "drywall12",
    name: '1/2" Drywall (4x8)',
    category: "drywall",
    unit: "sheet",
    basePrice: 14.95,
    unit_type: "ea",
  },
  {
    id: "drywall58",
    name: '5/8" Fire-Rated Drywall (4x8)',
    category: "drywall",
    unit: "sheet",
    basePrice: 18.75,
    unit_type: "ea",
  },
  {
    id: "joint_compound",
    name: "Joint Compound",
    category: "drywall",
    unit: "5 gallon",
    basePrice: 19.95,
    unit_type: "ea",
  },
  {
    id: "drywall_screws",
    name: "Drywall Screws",
    category: "drywall",
    unit: "lb",
    basePrice: 3.95,
    unit_type: "lb",
  },
  {
    id: "corner_bead",
    name: "Corner Bead",
    category: "drywall",
    unit: "10ft",
    basePrice: 5.25,
    unit_type: "ea",
  },

  // Concrete & Foundation
  {
    id: "concrete_mix",
    name: "Concrete Mix",
    category: "concrete",
    unit: "80lb bag",
    basePrice: 6.75,
    unit_type: "ea",
  },
  {
    id: "rebar",
    name: 'Rebar #4 (1/2")',
    category: "concrete",
    unit: "20ft",
    basePrice: 14.95,
    unit_type: "ea",
  },
  {
    id: "concrete_mesh",
    name: "Wire Mesh (5x10)",
    category: "concrete",
    unit: "sheet",
    basePrice: 29.75,
    unit_type: "ea",
  },
  {
    id: "foundation_block",
    name: "Foundation Block (8x8x16)",
    category: "concrete",
    unit: "block",
    basePrice: 2.25,
    unit_type: "ea",
  },

  // Roofing Materials
  {
    id: "roof_shingles",
    name: "Architectural Shingles",
    category: "roofing",
    unit: "bundle",
    basePrice: 39.95,
    unit_type: "ea",
  },
  {
    id: "roof_felt",
    name: "Roof Felt (15lb)",
    category: "roofing",
    unit: "400 sq ft",
    basePrice: 25.95,
    unit_type: "ea",
  },
  {
    id: "ridge_cap",
    name: "Ridge Cap Shingles",
    category: "roofing",
    unit: "bundle",
    basePrice: 45.5,
    unit_type: "ea",
  },
  {
    id: "roof_nails",
    name: "Roofing Nails",
    category: "roofing",
    unit: "5lb",
    basePrice: 6.95,
    unit_type: "ea",
  },

  // Electrical
  {
    id: "wire_14_2",
    name: "14/2 Romex Wire",
    category: "electrical",
    unit: "250ft",
    basePrice: 68.95,
    unit_type: "ea",
  },
  {
    id: "outlet",
    name: "Electrical Outlet",
    category: "electrical",
    unit: "each",
    basePrice: 3.25,
    unit_type: "ea",
  },
  {
    id: "switch",
    name: "Light Switch",
    category: "electrical",
    unit: "each",
    basePrice: 4.5,
    unit_type: "ea",
  },
  {
    id: "panel_100",
    name: "100A Panel Box",
    category: "electrical",
    unit: "each",
    basePrice: 125.0,
    unit_type: "ea",
  },

  // Plumbing
  {
    id: "pvc_40_2",
    name: '2" PVC Schedule 40',
    category: "plumbing",
    unit: "10ft",
    basePrice: 12.75,
    unit_type: "ea",
  },
  {
    id: "pex_12",
    name: '1/2" PEX Tubing',
    category: "plumbing",
    unit: "100ft",
    basePrice: 42.95,
    unit_type: "ea",
  },
  {
    id: "pex_fittings",
    name: "PEX Fittings",
    category: "plumbing",
    unit: "each",
    basePrice: 3.15,
    unit_type: "ea",
  },
  {
    id: "toilet",
    name: "Standard Toilet",
    category: "plumbing",
    unit: "each",
    basePrice: 99.0,
    unit_type: "ea",
  },

  // Flooring & Tile
  {
    id: "hardwood",
    name: "Hardwood Flooring",
    category: "flooring",
    unit: "sq ft",
    basePrice: 4.95,
    unit_type: "sq ft",
  },
  {
    id: "laminate",
    name: "Laminate Flooring",
    category: "flooring",
    unit: "sq ft",
    basePrice: 2.45,
    unit_type: "sq ft",
  },
  {
    id: "tile_ceramic",
    name: "12x12 Ceramic Tile",
    category: "flooring",
    unit: "sq ft",
    basePrice: 1.85,
    unit_type: "sq ft",
  },
  {
    id: "grout",
    name: "Tile Grout",
    category: "flooring",
    unit: "10lb bag",
    basePrice: 14.75,
    unit_type: "ea",
  },

  // Paint & Supplies
  {
    id: "paint_interior",
    name: "Interior Paint",
    category: "painting",
    unit: "gallon",
    basePrice: 32.95,
    unit_type: "ea",
  },
  {
    id: "paint_primer",
    name: "Primer",
    category: "painting",
    unit: "gallon",
    basePrice: 24.95,
    unit_type: "ea",
  },
  {
    id: "paint_brush",
    name: "Premium Paintbrush",
    category: "painting",
    unit: "each",
    basePrice: 12.95,
    unit_type: "ea",
  },
  {
    id: "paint_roller",
    name: "Paint Roller Kit",
    category: "painting",
    unit: "kit",
    basePrice: 18.5,
    unit_type: "ea",
  },
];

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  unit_type: string;
}

interface Supplier {
  id: string;
  name: string;
  priceMultiplier: number;
}

interface SelectedMaterial {
  materialId: string;
  quantity: number;
}

const MaterialCalculator: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("framing");
  const [selectedSupplier, setSelectedSupplier] = useState<string>(
    SUPPLIERS[0].id,
  );
  const [selectedMaterials, setSelectedMaterials] = useState<
    SelectedMaterial[]
  >([]);
  const [activeTab, setActiveTab] = useState<"materials" | "summary">(
    "materials",
  );
  const [projectName, setProjectName] = useState<string>(
    "New Construction Project",
  );

  // Filter materials by selected category
  const filteredMaterials = MATERIALS.filter(
    (material) => material.category === selectedCategory,
  );

  // Get current supplier
  const currentSupplier =
    SUPPLIERS.find((s) => s.id === selectedSupplier) || SUPPLIERS[0];

  // Add material to selection
  const addMaterial = (materialId: string) => {
    const existingIndex = selectedMaterials.findIndex(
      (m) => m.materialId === materialId,
    );

    if (existingIndex >= 0) {
      // Material already exists, increase quantity
      const updated = [...selectedMaterials];
      updated[existingIndex].quantity += 1;
      setSelectedMaterials(updated);
    } else {
      // Add new material with quantity 1
      setSelectedMaterials([...selectedMaterials, { materialId, quantity: 1 }]);
    }
  };

  // Update material quantity
  const updateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove material if quantity is 0 or negative
      setSelectedMaterials(
        selectedMaterials.filter((m) => m.materialId !== materialId),
      );
    } else {
      // Update quantity
      const updated = selectedMaterials.map((m) =>
        m.materialId === materialId ? { ...m, quantity } : m,
      );
      setSelectedMaterials(updated);
    }
  };

  // Calculate the price for a specific material with supplier pricing
  const calculateMaterialPrice = (materialId: string, quantity: number) => {
    const material = MATERIALS.find((m) => m.id === materialId);
    if (!material) return 0;

    return material.basePrice * currentSupplier.priceMultiplier * quantity;
  };

  // Calculate total cost
  const calculateTotal = () => {
    return selectedMaterials.reduce((total, item) => {
      return total + calculateMaterialPrice(item.materialId, item.quantity);
    }, 0);
  };

  // Compare prices from all suppliers
  const getPriceComparison = () => {
    return SUPPLIERS.map((supplier) => ({
      ...supplier,
      totalPrice: selectedMaterials.reduce((total, item) => {
        const material = MATERIALS.find((m) => m.id === item.materialId);
        if (!material) return total;
        return (
          total + material.basePrice * supplier.priceMultiplier * item.quantity
        );
      }, 0),
    }));
  };

  return (
    <div className="w-full" data-oid="9x.5qel">
      {/* Header with project title and supplier selection */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-space-700"
        data-oid="a_csazp"
      >
        <div className="mb-4 md:mb-0" data-oid="zu-tznm">
          <div className="flex items-center" data-oid="-.y68an">
            <div
              className="flex items-center justify-center h-10 w-10 rounded-full mr-3 bg-gradient-to-br from-cyan/20 to-transparent border border-cyan/30"
              data-oid="fc6xy14"
            >
              <i className="fas fa-calculator text-cyan" data-oid="0ts0ef0"></i>
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-medium text-white bg-transparent border-0 border-b border-transparent hover:border-space-600 focus:border-cyan focus:ring-0 focus:outline-none transition-colors px-1"
              data-oid="r65-m.9"
            />
          </div>
        </div>

        <div className="flex items-center" data-oid="e8_-hld">
          <span className="text-gray-400 mr-2" data-oid="_:qiuqh">
            Supplier:
          </span>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="bg-space-800 border border-space-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan focus:border-cyan"
            data-oid="0refvjq"
          >
            {SUPPLIERS.map((supplier) => (
              <option key={supplier.id} value={supplier.id} data-oid=".x1qm0a">
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-space-700 mb-6" data-oid="547ef_4">
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === "materials" ? "text-cyan" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("materials")}
          data-oid="bd23kjl"
        >
          <span data-oid="pb704un">Materials Selection</span>
          {activeTab === "materials" && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
              data-oid="etb8:jg"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === "summary" ? "text-cyan" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("summary")}
          data-oid="yn72rjo"
        >
          <span data-oid="v.tk:q5">Estimate Summary</span>
          {activeTab === "summary" && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
              data-oid="qr58qz."
            ></span>
          )}
        </button>
      </div>

      {activeTab === "materials" ? (
        <>
          {/* Category Selection */}
          <div className="mb-6 overflow-x-auto" data-oid="o:dl6ws">
            <div className="flex space-x-2 pb-3" data-oid="lgc6m8m">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cyan/60 to-electric/60 text-white font-medium shadow-lg shadow-cyan/10 border border-cyan/30"
                      : "bg-space-800/60 text-gray-300 hover:text-white hover:bg-space-700/60 border border-space-700"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  data-oid="q5s_09a"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Materials List */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            data-oid="xyypf5y"
          >
            {filteredMaterials.map((material) => {
              const selectedMaterial = selectedMaterials.find(
                (m) => m.materialId === material.id,
              );
              const quantity = selectedMaterial?.quantity || 0;

              return (
                <div
                  key={material.id}
                  className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                    quantity > 0
                      ? "bg-space-800/80 border-cyan/40 shadow-lg shadow-cyan/5"
                      : "bg-space-900/70 border-space-700 hover:border-space-600"
                  }`}
                  data-oid="r4jb5r6"
                >
                  {quantity > 0 && (
                    <div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
                      data-oid="1ctaefz"
                    ></div>
                  )}

                  <div className="flex justify-between mb-3" data-oid="zgh56ji">
                    <h3 className="font-medium text-white" data-oid="2vtav1.">
                      {material.name}
                    </h3>
                    <div className="text-sm text-gray-400" data-oid="ei74gyb">
                      {material.unit}
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center mb-3"
                    data-oid="tl9vdhp"
                  >
                    <div className="text-lg text-cyan" data-oid="8h0cu0.">
                      $
                      {(
                        material.basePrice * currentSupplier.priceMultiplier
                      ).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400" data-oid="kg:7sn:">
                      per {material.unit_type}
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    data-oid="76ah7jf"
                  >
                    {quantity > 0 ? (
                      <div
                        className="flex items-center border border-space-600 rounded-lg overflow-hidden"
                        data-oid="noanrm9"
                      >
                        <button
                          className="bg-space-700 hover:bg-space-600 text-white px-3 py-1 transition-colors"
                          onClick={() =>
                            updateQuantity(material.id, quantity - 1)
                          }
                          data-oid="s7p1ebj"
                        >
                          <i className="fas fa-minus" data-oid="wpab0st"></i>
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) =>
                            updateQuantity(
                              material.id,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-16 bg-space-800 border-0 text-center text-white focus:ring-0"
                          data-oid="bonhazn"
                        />

                        <button
                          className="bg-space-700 hover:bg-space-600 text-white px-3 py-1 transition-colors"
                          onClick={() =>
                            updateQuantity(material.id, quantity + 1)
                          }
                          data-oid="qg1rhol"
                        >
                          <i className="fas fa-plus" data-oid="dfdplgc"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="px-3 py-1.5 rounded-lg bg-space-800 hover:bg-cyan/20 text-gray-300 hover:text-cyan border border-space-700 hover:border-cyan/30 transition-all duration-300 text-sm"
                        onClick={() => addMaterial(material.id)}
                        data-oid="fys1tnr"
                      >
                        <i className="fas fa-plus mr-1" data-oid="dmexz_c"></i>{" "}
                        Add
                      </button>
                    )}

                    {quantity > 0 && (
                      <div
                        className="text-white font-medium"
                        data-oid="lx3akxb"
                      >
                        $
                        {calculateMaterialPrice(material.id, quantity).toFixed(
                          2,
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Materials Summary */}
          {selectedMaterials.length > 0 && (
            <GlassCard className="p-5 border-cyan/20 mt-6" data-oid="piog_-d">
              <div
                className="flex justify-between items-center mb-4"
                data-oid="71_07d5"
              >
                <h3
                  className="text-lg font-medium text-white"
                  data-oid="lyd3wrg"
                >
                  Selected Materials
                </h3>
                <div
                  className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm"
                  data-oid="m95_3os"
                >
                  {selectedMaterials.length} item
                  {selectedMaterials.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="mb-4 max-h-60 overflow-y-auto" data-oid="w_6wm22">
                {selectedMaterials.map((item) => {
                  const material = MATERIALS.find(
                    (m) => m.id === item.materialId,
                  );
                  if (!material) return null;

                  return (
                    <div
                      key={item.materialId}
                      className="flex justify-between items-center py-2 border-b border-space-700 last:border-b-0"
                      data-oid="cq3siwh"
                    >
                      <div className="flex-1" data-oid="y3n::oz">
                        <div
                          className="font-medium text-white"
                          data-oid="5ylv:rq"
                        >
                          {material.name}
                        </div>
                        <div
                          className="text-sm text-gray-400"
                          data-oid="sfwmy-k"
                        >
                          {item.quantity} × $
                          {(
                            material.basePrice * currentSupplier.priceMultiplier
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div
                        className="text-right font-medium text-white"
                        data-oid="pi5b6ie"
                      >
                        $
                        {calculateMaterialPrice(
                          material.id,
                          item.quantity,
                        ).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="flex justify-between items-center pt-3 border-t border-space-700"
                data-oid="azt-gza"
              >
                <div
                  className="text-lg font-medium text-white"
                  data-oid="y3j.ztl"
                >
                  Total Estimate:
                </div>
                <div className="text-xl font-bold text-cyan" data-oid="tqz:n.h">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>

              <div className="mt-4 text-right" data-oid="h_6y5y2">
                <button
                  className="px-4 py-2 rounded-lg bg-cyan/20 text-cyan border border-cyan/30 hover:bg-cyan/30 transition-colors"
                  onClick={() => setActiveTab("summary")}
                  data-oid=".528odn"
                >
                  <i
                    className="fas fa-clipboard-check mr-2"
                    data-oid="93zpnk4"
                  ></i>{" "}
                  View Complete Summary
                </button>
              </div>
            </GlassCard>
          )}
        </>
      ) : (
        <>
          {/* Estimate Summary */}
          <GlassCard
            className="p-6 border-cyan/20 mb-6 backdrop-blur-lg"
            data-oid="eggk9p:"
          >
            <div
              className="flex justify-between items-start mb-6"
              data-oid="mqapqg9"
            >
              <div data-oid="xamd22s">
                <h2
                  className="text-2xl font-bold text-white mb-1"
                  data-oid=":_z8z76"
                >
                  {projectName}
                </h2>
                <p className="text-gray-400" data-oid="le3-9ry">
                  Material Estimate Summary
                </p>
              </div>
              <div className="flex space-x-2" data-oid="96k7hyd">
                <button
                  className="p-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  data-oid="6yjzf:n"
                >
                  <i className="fas fa-print" data-oid="qczvj:b"></i>
                </button>
                <button
                  className="p-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  data-oid="x_e:eo6"
                >
                  <i className="fas fa-share-alt" data-oid="_4l89t3"></i>
                </button>
              </div>
            </div>

            {selectedMaterials.length > 0 ? (
              <>
                <div
                  className="bg-space-900/60 rounded-lg p-5 mb-6"
                  data-oid="puq7xm6"
                >
                  <h3
                    className="text-lg font-medium text-white mb-4"
                    data-oid="ker1qg3"
                  >
                    Material List
                  </h3>

                  <div className="overflow-x-auto" data-oid="84kahk3">
                    <table className="w-full" data-oid="tkhp71x">
                      <thead data-oid="pgkgi58">
                        <tr
                          className="border-b border-space-700 text-left"
                          data-oid="s2sl0o5"
                        >
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="u-0ii8k"
                          >
                            Material
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="l5xdgnb"
                          >
                            Quantity
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="q5vxhvj"
                          >
                            Unit
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300 text-right"
                            data-oid="q010st_"
                          >
                            Unit Price
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300 text-right"
                            data-oid="epu_lch"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody data-oid="4_s1le8">
                        {selectedMaterials.map((item) => {
                          const material = MATERIALS.find(
                            (m) => m.id === item.materialId,
                          );
                          if (!material) return null;

                          return (
                            <tr
                              key={item.materialId}
                              className="border-b border-space-800/60"
                              data-oid="27q-z2d"
                            >
                              <td
                                className="py-3 text-white"
                                data-oid="ma9lcbv"
                              >
                                {material.name}
                              </td>
                              <td
                                className="py-3 text-white"
                                data-oid="kcvpfj9"
                              >
                                {item.quantity}
                              </td>
                              <td
                                className="py-3 text-gray-400"
                                data-oid="kc2z-4k"
                              >
                                {material.unit}
                              </td>
                              <td
                                className="py-3 text-white text-right"
                                data-oid="xn7lsi_"
                              >
                                $
                                {(
                                  material.basePrice *
                                  currentSupplier.priceMultiplier
                                ).toFixed(2)}
                              </td>
                              <td
                                className="py-3 text-white text-right font-medium"
                                data-oid="lvg:7dj"
                              >
                                $
                                {calculateMaterialPrice(
                                  material.id,
                                  item.quantity,
                                ).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot data-oid="p7go70o">
                        <tr data-oid=".mm-6f.">
                          <td
                            colSpan={4}
                            className="pt-4 text-right text-white font-medium"
                            data-oid="rl.z1al"
                          >
                            Total:
                          </td>
                          <td
                            className="pt-4 text-right text-cyan font-bold"
                            data-oid="5csgvac"
                          >
                            ${calculateTotal().toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Supplier Price Comparison */}
                <div data-oid="tgetdeu">
                  <h3
                    className="text-lg font-medium text-white mb-4"
                    data-oid="ig-789w"
                  >
                    Supplier Price Comparison
                  </h3>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    data-oid="4q1d3t3"
                  >
                    {getPriceComparison().map((supplier) => {
                      const isSelected = supplier.id === selectedSupplier;

                      return (
                        <div
                          key={supplier.id}
                          className={`rounded-xl p-4 transition-all duration-300 ${isSelected ? "bg-cyan/10 border border-cyan/30" : "bg-space-800/60 border border-space-700"}`}
                          data-oid="q2n:wht"
                        >
                          <div
                            className="flex justify-between items-start mb-3"
                            data-oid="i014qmj"
                          >
                            <div
                              className="font-medium text-white"
                              data-oid="fq2bsd_"
                            >
                              {supplier.name}
                            </div>
                            {isSelected && (
                              <div
                                className="px-2 py-0.5 rounded-full bg-cyan/20 text-cyan text-xs"
                                data-oid="xrf:5ge"
                              >
                                Selected
                              </div>
                            )}
                          </div>

                          <div
                            className={`text-2xl font-bold mb-2 ${isSelected ? "text-cyan" : "text-white"}`}
                            data-oid="u7rhx-c"
                          >
                            ${supplier.totalPrice.toFixed(2)}
                          </div>

                          <div
                            className="text-sm text-gray-400 mb-3"
                            data-oid="h8ox49b"
                          >
                            Price multiplier:{" "}
                            {supplier.priceMultiplier.toFixed(2)}x
                          </div>

                          {!isSelected && (
                            <button
                              className="w-full py-1.5 text-sm font-medium rounded-lg bg-space-700/60 text-gray-300 hover:bg-cyan/20 hover:text-cyan border border-space-600 hover:border-cyan/30 transition-all duration-300"
                              onClick={() => setSelectedSupplier(supplier.id)}
                              data-oid="jnlb6kt"
                            >
                              Select Supplier
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="text-center py-10 text-gray-400"
                data-oid="sceov:_"
              >
                <i
                  className="fas fa-clipboard-list text-5xl mb-3"
                  data-oid="ic32ak6"
                ></i>
                <p data-oid="oq57l.h">
                  No materials added to your estimate yet.
                </p>
                <button
                  className="mt-4 px-4 py-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  onClick={() => setActiveTab("materials")}
                  data-oid="bz1hn-a"
                >
                  <i className="fas fa-plus mr-2" data-oid="cq6jqiy"></i> Add
                  Materials
                </button>
              </div>
            )}
          </GlassCard>
        </>
      )}
    </div>
  );
};

export default MaterialCalculator;
