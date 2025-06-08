import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CalculatorToolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalculatorToolModal: FC<CalculatorToolModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [display, setDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [memory, setMemory] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("standard");

  // Calculations for construction
  const [length, setLength] = useState("0");
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [pricePerUnit, setPricePerUnit] = useState("0");
  const [wasteFactor, setWasteFactor] = useState("10"); // Default 10% waste

  const clearAll = () => {
    setDisplay("0");
    setSecondaryDisplay("");
    setPendingOperator(null);
    setWaitingForOperand(true);
  };

  const clearEntry = () => {
    setDisplay("0");
    setWaitingForOperand(true);
  };

  const backspace = () => {
    if (waitingForOperand) return;

    if (display.length > 1) {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay("0");
      setWaitingForOperand(true);
    }
  };

  const digitPressed = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const decimalPressed = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const unaryOperatorPressed = (operator: string) => {
    const operand = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "sqrt":
        if (operand < 0) {
          setDisplay("Error");
          setWaitingForOperand(true);
          return;
        }
        result = Math.sqrt(operand);
        break;
      case "1/x":
        if (operand === 0) {
          setDisplay("Error");
          setWaitingForOperand(true);
          return;
        }
        result = 1 / operand;
        break;
      case "+/-":
        result = -operand;
        break;
      case "%":
        result = operand / 100;
        break;
    }

    setDisplay(result.toString());
    setWaitingForOperand(true);
  };

  const binaryOperatorPressed = (operator: string) => {
    const operand = parseFloat(display);

    if (pendingOperator !== null) {
      if (!calculate(operand)) {
        return;
      }
    } else {
      setDisplay(operand.toString());
    }

    setPendingOperator(operator);
    setSecondaryDisplay(`${display} ${getOperatorSymbol(operator)}`);
    setWaitingForOperand(true);
  };

  const calculate = (rightOperand: number): boolean => {
    if (pendingOperator === null) {
      return true;
    }

    const leftOperand = parseFloat(display);
    let result = 0;

    switch (pendingOperator) {
      case "+":
        result = leftOperand + rightOperand;
        break;
      case "-":
        result = leftOperand - rightOperand;
        break;
      case "*":
        result = leftOperand * rightOperand;
        break;
      case "/":
        if (rightOperand === 0) {
          setDisplay("Error");
          setSecondaryDisplay("");
          setPendingOperator(null);
          setWaitingForOperand(true);
          return false;
        }
        result = leftOperand / rightOperand;
        break;
      case "^":
        result = Math.pow(leftOperand, rightOperand);
        break;
    }

    setDisplay(result.toString());
    return true;
  };

  const equalsPressed = () => {
    const operand = parseFloat(display);

    if (pendingOperator !== null) {
      if (!calculate(operand)) {
        return;
      }

      setPendingOperator(null);
    }

    setSecondaryDisplay("");
    setWaitingForOperand(true);
  };

  const memoryPlus = () => {
    const value = parseFloat(display);
    setMemory((memory === null ? 0 : memory) + value);
    setWaitingForOperand(true);
  };

  const memoryMinus = () => {
    const value = parseFloat(display);
    setMemory((memory === null ? 0 : memory) - value);
    setWaitingForOperand(true);
  };

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(memory.toString());
      setWaitingForOperand(true);
    }
  };

  const memoryClear = () => {
    setMemory(null);
  };

  const getOperatorSymbol = (operator: string): string => {
    switch (operator) {
      case "+":
        return "+";
      case "-":
        return "−";
      case "*":
        return "×";
      case "/":
        return "÷";
      case "^":
        return "^";
      default:
        return "";
    }
  };

  // Construction calculations
  const calculateArea = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return l * w;
  };

  const calculateVolume = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return l * w * h;
  };

  const calculateCost = (value: number) => {
    const price = parseFloat(pricePerUnit) || 0;
    const waste = parseFloat(wasteFactor) || 0;
    // Apply waste factor
    const totalWithWaste = value * (1 + waste / 100);
    return totalWithWaste * price;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="4r9pt9z">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-md p-0"
        data-oid="1ptrcxq"
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="j0oq64m">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="ppxxyeg"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="bzuv9ds"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="fjkm1n5"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="jf78hm5"
          ></div>
        </div>

        <div className="relative z-10 p-6" data-oid="hc_gge4">
          <DialogHeader className="mb-4" data-oid="u02wrki">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="ykyx_ou"
            >
              <i className="fas fa-calculator mr-3" data-oid="yzfzlli"></i>
              <span data-oid=".7a1a-.">Construction Calculator</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="standard"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            data-oid="dv6m_j5"
          >
            <TabsList
              className="grid w-full grid-cols-2 bg-space-800"
              data-oid="vp8no2d"
            >
              <TabsTrigger
                value="standard"
                className="data-[state=active]:bg-space-700"
                data-oid="wuljzpd"
              >
                Standard
              </TabsTrigger>
              <TabsTrigger
                value="construction"
                className="data-[state=active]:bg-space-700"
                data-oid="kzhcaaq"
              >
                Construction
              </TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="mt-4" data-oid="d3njix9">
              <div
                className="bg-space-800 p-4 rounded-lg mb-4"
                data-oid="ckhdplh"
              >
                <div
                  className="text-right text-sm text-gray-400 h-5"
                  data-oid="1qkmp_8"
                >
                  {secondaryDisplay}
                </div>
                <div
                  className="text-right text-3xl font-medium h-10 overflow-hidden"
                  data-oid="i7ryzx:"
                >
                  {display}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2" data-oid="vc234t5">
                {/* Memory Row */}
                <Button
                  variant="outline"
                  className={`bg-space-800 hover:bg-space-700 text-sm ${memory === null ? "text-gray-500" : "text-cyan-400"}`}
                  onClick={memoryClear}
                  data-oid="qi6jpsa"
                >
                  MC
                </Button>
                <Button
                  variant="outline"
                  className={`bg-space-800 hover:bg-space-700 text-sm ${memory === null ? "text-gray-500" : "text-cyan-400"}`}
                  onClick={memoryRecall}
                  data-oid="820s9:q"
                >
                  MR
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-sm"
                  onClick={memoryPlus}
                  data-oid="irr.dbx"
                >
                  M+
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-sm"
                  onClick={memoryMinus}
                  data-oid="4x5aql4"
                >
                  M-
                </Button>

                {/* First Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-red-400"
                  onClick={clearAll}
                  data-oid="260kq-x"
                >
                  C
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-red-400"
                  onClick={clearEntry}
                  data-oid="6w1odzt"
                >
                  CE
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={backspace}
                  data-oid="f-f82wx"
                >
                  <i className="fas fa-backspace" data-oid="pwfyscu"></i>
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("/")}
                  data-oid="neh4wq:"
                >
                  ÷
                </Button>

                {/* Second Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("7")}
                  data-oid="tvghw:d"
                >
                  7
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("8")}
                  data-oid="qk4l2r1"
                >
                  8
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("9")}
                  data-oid="e5mf8ev"
                >
                  9
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("*")}
                  data-oid="t:nv40b"
                >
                  ×
                </Button>

                {/* Third Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("4")}
                  data-oid="j86_0pd"
                >
                  4
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("5")}
                  data-oid="mk3.xnd"
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("6")}
                  data-oid="8e4j_2b"
                >
                  6
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("-")}
                  data-oid=":7p677w"
                >
                  −
                </Button>

                {/* Fourth Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("1")}
                  data-oid="6wh8rpu"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("2")}
                  data-oid=":hb1efx"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("3")}
                  data-oid="_n48656"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("+")}
                  data-oid="k2_h:8:"
                >
                  +
                </Button>

                {/* Fifth Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("+/-")}
                  data-oid="wxn0e5j"
                >
                  ±
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("0")}
                  data-oid="c.blai7"
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={decimalPressed}
                  data-oid="fwa.efm"
                >
                  .
                </Button>
                <Button
                  variant="outline"
                  className="bg-cyan-700 hover:bg-cyan-600 text-white"
                  onClick={equalsPressed}
                  data-oid="eg1_tna"
                >
                  =
                </Button>

                {/* Sixth Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("sqrt")}
                  data-oid="q_hki91"
                >
                  √
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("^")}
                  data-oid="27h8oxv"
                >
                  x<sup data-oid="w.aj77o">y</sup>
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("%")}
                  data-oid="vuigl34"
                >
                  %
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("1/x")}
                  data-oid="rpuym11"
                >
                  1/x
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="construction"
              className="mt-4"
              data-oid="yivmu-5"
            >
              <div
                className="bg-space-800 p-4 rounded-lg mb-4 space-y-3"
                data-oid="bme3rmg"
              >
                <div className="grid grid-cols-2 gap-4" data-oid="7_ojio7">
                  <div data-oid="bujrb-j">
                    <label className="text-sm text-gray-400" data-oid="isf:sb7">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      data-oid="lwod.ua"
                    />
                  </div>
                  <div data-oid="x2:.bw0">
                    <label className="text-sm text-gray-400" data-oid="97mmfqo">
                      Width (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      data-oid="26hkh2:"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid=".4k11tc">
                  <div data-oid="bhvpjly">
                    <label className="text-sm text-gray-400" data-oid="v4aemjo">
                      Height (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      data-oid="woid_vq"
                    />
                  </div>
                  <div data-oid="wkwmzaa">
                    <label className="text-sm text-gray-400" data-oid="ujuvv9k">
                      Price per unit ($)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={pricePerUnit}
                      onChange={(e) => setPricePerUnit(e.target.value)}
                      data-oid="ara9j2w"
                    />
                  </div>
                </div>

                <div data-oid="omlqrlg">
                  <label className="text-sm text-gray-400" data-oid="zwrwros">
                    Waste factor (%)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.value)}
                    min="0"
                    max="100"
                    data-oid="o_4hmc0"
                  />
                </div>
              </div>

              <div
                className="bg-space-900/70 p-4 rounded-lg space-y-3"
                data-oid="bzl5dwl"
              >
                <h3
                  className="text-sm font-medium text-cyan-400 mb-2"
                  data-oid="0itu3kx"
                >
                  Results
                </h3>

                <div className="grid grid-cols-2 gap-2" data-oid="768d19v">
                  <div className="bg-space-800 p-3 rounded" data-oid="jy_a.5l">
                    <div className="text-xs text-gray-400" data-oid="34ctirs">
                      Area
                    </div>
                    <div className="text-lg font-medium" data-oid="kycg.2b">
                      {formatNumber(calculateArea())} m²
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="2q1.852">
                    <div className="text-xs text-gray-400" data-oid="k.ei_sj">
                      Volume
                    </div>
                    <div className="text-lg font-medium" data-oid="0y43mij">
                      {formatNumber(calculateVolume())} m³
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="o6zfj5b">
                    <div className="text-xs text-gray-400" data-oid="v5lntuf">
                      Area Cost
                    </div>
                    <div
                      className="text-lg font-medium text-cyan-400"
                      data-oid="48_2geb"
                    >
                      ${formatNumber(calculateCost(calculateArea()))}
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="qh122vp">
                    <div className="text-xs text-gray-400" data-oid="ojuo0cu">
                      Volume Cost
                    </div>
                    <div
                      className="text-lg font-medium text-cyan-400"
                      data-oid="a8cn9x0"
                    >
                      ${formatNumber(calculateCost(calculateVolume()))}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-2" data-oid="y9s5:fe">
                  Includes {wasteFactor}% waste factor
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorToolModal;
