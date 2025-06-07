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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="77vqln5">
      <DialogContent
        className="bg-gradient-to-br from-space-900 via-space-950 to-space-900 border border-space-700/50 text-white max-w-md p-0"
        data-oid="p:f87_."
      >
        <div className="absolute inset-0 overflow-hidden" data-oid="oc_oa9t">
          <div
            className="absolute -inset-[100px] bg-cyan-800/5 blur-3xl rounded-full top-0 right-0 z-0"
            data-oid="f2l994f"
          ></div>
          <div
            className="absolute -inset-[100px] bg-blue-800/5 blur-3xl rounded-full bottom-0 left-0 z-0"
            data-oid="c1-:xja"
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="oqqym04"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            data-oid="cz1tq7d"
          ></div>
        </div>

        <div className="relative z-10 p-6" data-oid="59a77cp">
          <DialogHeader className="mb-4" data-oid="w3h3jqo">
            <DialogTitle
              className="flex items-center text-xl font-space text-cyan-400 tracking-wide"
              data-oid="ufx:jdm"
            >
              <i className="fas fa-calculator mr-3" data-oid="vt4qu-v"></i>
              <span data-oid="wlvflqn">Construction Calculator</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="standard"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
            data-oid="sl_ommo"
          >
            <TabsList
              className="grid w-full grid-cols-2 bg-space-800"
              data-oid="0_cqa4i"
            >
              <TabsTrigger
                value="standard"
                className="data-[state=active]:bg-space-700"
                data-oid=":uox:-l"
              >
                Standard
              </TabsTrigger>
              <TabsTrigger
                value="construction"
                className="data-[state=active]:bg-space-700"
                data-oid="rkfuoz0"
              >
                Construction
              </TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="mt-4" data-oid="6x355nl">
              <div
                className="bg-space-800 p-4 rounded-lg mb-4"
                data-oid="1.zvu0u"
              >
                <div
                  className="text-right text-sm text-gray-400 h-5"
                  data-oid="lf5qhtw"
                >
                  {secondaryDisplay}
                </div>
                <div
                  className="text-right text-3xl font-medium h-10 overflow-hidden"
                  data-oid="w4okspi"
                >
                  {display}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2" data-oid=".k7_.r-">
                {/* Memory Row */}
                <Button
                  variant="outline"
                  className={`bg-space-800 hover:bg-space-700 text-sm ${memory === null ? "text-gray-500" : "text-cyan-400"}`}
                  onClick={memoryClear}
                  data-oid="86wc2pn"
                >
                  MC
                </Button>
                <Button
                  variant="outline"
                  className={`bg-space-800 hover:bg-space-700 text-sm ${memory === null ? "text-gray-500" : "text-cyan-400"}`}
                  onClick={memoryRecall}
                  data-oid="my8io.y"
                >
                  MR
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-sm"
                  onClick={memoryPlus}
                  data-oid="zuy9--8"
                >
                  M+
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-sm"
                  onClick={memoryMinus}
                  data-oid="4r89ztl"
                >
                  M-
                </Button>

                {/* First Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-red-400"
                  onClick={clearAll}
                  data-oid="j6wr6s1"
                >
                  C
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-red-400"
                  onClick={clearEntry}
                  data-oid="rxg1pom"
                >
                  CE
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={backspace}
                  data-oid="qf.l50c"
                >
                  <i className="fas fa-backspace" data-oid="3.2pptp"></i>
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("/")}
                  data-oid="l04pogo"
                >
                  ÷
                </Button>

                {/* Second Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("7")}
                  data-oid="jkpkjng"
                >
                  7
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("8")}
                  data-oid="ft1ujb8"
                >
                  8
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("9")}
                  data-oid="3l84emq"
                >
                  9
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("*")}
                  data-oid="i:h3lh0"
                >
                  ×
                </Button>

                {/* Third Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("4")}
                  data-oid="gh6-357"
                >
                  4
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("5")}
                  data-oid="y3sd5uj"
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("6")}
                  data-oid="bzficrt"
                >
                  6
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("-")}
                  data-oid="08kb5iw"
                >
                  −
                </Button>

                {/* Fourth Row */}
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("1")}
                  data-oid="q4l--iu"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("2")}
                  data-oid="k3rj_a4"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("3")}
                  data-oid="wic0r5k"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("+")}
                  data-oid="4v2c0sd"
                >
                  +
                </Button>

                {/* Fifth Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("+/-")}
                  data-oid=":hdhi-1"
                >
                  ±
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={() => digitPressed("0")}
                  data-oid="9dq-qhb"
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-900 hover:bg-space-800"
                  onClick={decimalPressed}
                  data-oid="e.i_jix"
                >
                  .
                </Button>
                <Button
                  variant="outline"
                  className="bg-cyan-700 hover:bg-cyan-600 text-white"
                  onClick={equalsPressed}
                  data-oid="yl-iqn8"
                >
                  =
                </Button>

                {/* Sixth Row */}
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("sqrt")}
                  data-oid="m9.31tc"
                >
                  √
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => binaryOperatorPressed("^")}
                  data-oid="1f:mlkc"
                >
                  x<sup data-oid="pwlt8af">y</sup>
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("%")}
                  data-oid="2bp85qw"
                >
                  %
                </Button>
                <Button
                  variant="outline"
                  className="bg-space-800 hover:bg-space-700 text-cyan-400"
                  onClick={() => unaryOperatorPressed("1/x")}
                  data-oid="tlfbj_e"
                >
                  1/x
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="construction"
              className="mt-4"
              data-oid="4ehkhex"
            >
              <div
                className="bg-space-800 p-4 rounded-lg mb-4 space-y-3"
                data-oid="eourc0f"
              >
                <div className="grid grid-cols-2 gap-4" data-oid=".2z4pvk">
                  <div data-oid="9yk94e8">
                    <label className="text-sm text-gray-400" data-oid="vh7k.d6">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      data-oid="0ase0ip"
                    />
                  </div>
                  <div data-oid="csylq.l">
                    <label className="text-sm text-gray-400" data-oid="a8y1x9t">
                      Width (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      data-oid="lu4.z_7"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid=":iubvok">
                  <div data-oid="dv7f85l">
                    <label className="text-sm text-gray-400" data-oid="h8tp75.">
                      Height (m)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      data-oid="2y1yzd0"
                    />
                  </div>
                  <div data-oid="47aofdh">
                    <label className="text-sm text-gray-400" data-oid=".8634_0">
                      Price per unit ($)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                      value={pricePerUnit}
                      onChange={(e) => setPricePerUnit(e.target.value)}
                      data-oid="6pn-nh5"
                    />
                  </div>
                </div>

                <div data-oid="u-en.n1">
                  <label className="text-sm text-gray-400" data-oid="j.8b9zp">
                    Waste factor (%)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-space-900 border border-space-700 rounded px-3 py-2 text-white mt-1"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.value)}
                    min="0"
                    max="100"
                    data-oid="g49fm28"
                  />
                </div>
              </div>

              <div
                className="bg-space-900/70 p-4 rounded-lg space-y-3"
                data-oid="ni8.tu5"
              >
                <h3
                  className="text-sm font-medium text-cyan-400 mb-2"
                  data-oid="jaihlvg"
                >
                  Results
                </h3>

                <div className="grid grid-cols-2 gap-2" data-oid="fdomoqx">
                  <div className="bg-space-800 p-3 rounded" data-oid="kjhqw29">
                    <div className="text-xs text-gray-400" data-oid="adocl.7">
                      Area
                    </div>
                    <div className="text-lg font-medium" data-oid="kpya3if">
                      {formatNumber(calculateArea())} m²
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="vsz:hfe">
                    <div className="text-xs text-gray-400" data-oid="aepwec3">
                      Volume
                    </div>
                    <div className="text-lg font-medium" data-oid="wkmka8x">
                      {formatNumber(calculateVolume())} m³
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="uik6bz-">
                    <div className="text-xs text-gray-400" data-oid="7958_ct">
                      Area Cost
                    </div>
                    <div
                      className="text-lg font-medium text-cyan-400"
                      data-oid="wnw_prk"
                    >
                      ${formatNumber(calculateCost(calculateArea()))}
                    </div>
                  </div>

                  <div className="bg-space-800 p-3 rounded" data-oid="4b_a0z2">
                    <div className="text-xs text-gray-400" data-oid="lwtik3z">
                      Volume Cost
                    </div>
                    <div
                      className="text-lg font-medium text-cyan-400"
                      data-oid="pxzso76"
                    >
                      ${formatNumber(calculateCost(calculateVolume()))}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-2" data-oid="k.cvtks">
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
