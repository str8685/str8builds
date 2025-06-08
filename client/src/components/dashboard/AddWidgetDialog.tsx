import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WidgetOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  disabled?: boolean;
}

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableWidgets: WidgetOption[];
  onAddWidget: (widgetId: string) => void;
}

const AddWidgetDialog: FC<AddWidgetDialogProps> = ({
  open,
  onOpenChange,
  availableWidgets,
  onAddWidget,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="03js:x1">
      <DialogContent
        className="bg-space-900/95 border-space-700 text-white max-w-4xl"
        data-oid="embeuks"
      >
        <DialogHeader data-oid="x.x1thu">
          <DialogTitle
            className="text-xl font-space text-white"
            data-oid="uwgrj4l"
          >
            Add Widgets to Dashboard
          </DialogTitle>
          <DialogDescription className="text-gray-400" data-oid="nm_i54e">
            Select widgets to add to your dashboard. You can customize their
            position later.
          </DialogDescription>
        </DialogHeader>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          data-oid="3ts9np8"
        >
          {availableWidgets.map((widget) => (
            <GlassCard
              key={widget.id}
              className={`p-4 transition-all hover:border-cyan cursor-pointer ${widget.disabled ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => {
                if (!widget.disabled) {
                  onAddWidget(widget.id);
                }
              }}
              data-oid="0us8qyz"
            >
              <div className="flex items-start gap-3" data-oid="wlrtzjr">
                <div className="text-2xl text-cyan" data-oid="xa8bud:">
                  <i className={`fas ${widget.icon}`} data-oid="u0n1t.k"></i>
                </div>
                <div data-oid="iv666uw">
                  <h3 className="text-white font-medium" data-oid="fv1k2r0">
                    {widget.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1" data-oid="mrm:zp6">
                    {widget.description}
                  </p>
                  {widget.disabled && (
                    <div
                      className="text-yellow-400 text-xs mt-2"
                      data-oid="l_7:ie8"
                    >
                      <i
                        className="fas fa-info-circle mr-1"
                        data-oid="afz:tip"
                      ></i>{" "}
                      Already on dashboard
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6 flex justify-end" data-oid="s0.4cg6">
          <button
            className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700 mr-2"
            onClick={() => onOpenChange(false)}
            data-oid="20l2ci8"
          >
            Cancel
          </button>
          <button
            className="bg-purple-900 text-cyan px-4 py-2 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
            onClick={() => onOpenChange(false)}
            data-oid="eowwb7b"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetDialog;
