import { FC } from "react";

interface ModelFallbackProps {
  message?: string;
  className?: string;
}

const ModelFallback: FC<ModelFallbackProps> = ({
  message = "Model loading failed or not available",
  className = "",
}) => {
  return (
    <div
      className={`bg-space-900 flex flex-col items-center justify-center ${className}`}
      data-oid="kyu:f:g"
    >
      <div className="text-4xl text-cyan/50 mb-4" data-oid="wgnchbw">
        <i className="fas fa-cube" data-oid="1p.obf4"></i>
      </div>
      <div className="text-center max-w-md px-4" data-oid="imdedsy">
        <h3 className="text-white font-medium mb-2" data-oid=".38gz2z">
          3D Preview
        </h3>
        <p className="text-gray-400 text-sm" data-oid="2j_voxx">
          {message}
        </p>
      </div>
      <div className="mt-4" data-oid="vb9f6f9">
        <div
          className="text-xs inline-block bg-purple-900/50 text-cyan px-3 py-1 rounded"
          data-oid="oskv9ig"
        >
          Available in next update
        </div>
      </div>
    </div>
  );
};

export default ModelFallback;
