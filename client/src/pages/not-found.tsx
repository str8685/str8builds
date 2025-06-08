import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-space-950 bg-noise"
      data-oid="b68xvmt"
    >
      <div
        className="w-full max-w-md mx-4 p-6 rounded-xl glass-card bg-space-900"
        data-oid="c79grn."
      >
        <div className="flex mb-4 gap-3 items-center" data-oid="14btuvm">
          <AlertCircle className="h-8 w-8 text-red-400" data-oid="yq9hw3h" />
          <h1 className="text-2xl font-bold text-white" data-oid="r45_jhi">
            404 Page Not Found
          </h1>
        </div>

        <p className="mt-4 text-sm text-gray-300" data-oid="582xl_s">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex justify-end" data-oid="d-ozzrf">
          <a
            href="/"
            className="px-4 py-2 rounded bg-purple-900 text-cyan hover:bg-purple-800 transition-colors duration-200 btn-glow btn-glow-cyan"
            data-oid="89x39uv"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
