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
      data-oid="nx859qb"
    >
      <div className="text-4xl text-cyan/50 mb-4" data-oid="cgq-n6x">
        <i className="fas fa-cube" data-oid="72d:4tn"></i>
      </div>
      <div className="text-center max-w-md px-4" data-oid="pxcj328">
        <h3 className="text-white font-medium mb-2" data-oid="ahafg4f">
          3D Preview
        </h3>
        <p className="text-gray-400 text-sm" data-oid="74l3t95">
          {message}
        </p>
      </div>
      <div className="mt-4" data-oid="ton4dzq">
        <div
          className="text-xs inline-block bg-purple-900/50 text-cyan px-3 py-1 rounded"
          data-oid="qrwhxfw"
        >
          Available in next update
        </div>
      </div>
    </div>
  );
};

export default ModelFallback;
