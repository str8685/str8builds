import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-space-950 bg-noise"
      data-oid="tcm0qu3"
    >
      <div
        className="w-full max-w-md mx-4 p-6 rounded-xl glass-card bg-space-900"
        data-oid="wl584k:"
      >
        <div className="flex mb-4 gap-3 items-center" data-oid="-9uwbiy">
          <AlertCircle className="h-8 w-8 text-red-400" data-oid=".2x.o0y" />
          <h1 className="text-2xl font-bold text-white" data-oid="0w:1g_c">
            404 Page Not Found
          </h1>
        </div>

        <p className="mt-4 text-sm text-gray-300" data-oid="ueabh9.">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 flex justify-end" data-oid="wtl94-_">
          <a
            href="/"
            className="px-4 py-2 rounded bg-purple-900 text-cyan hover:bg-purple-800 transition-colors duration-200 btn-glow btn-glow-cyan"
            data-oid="8.j-7lv"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
