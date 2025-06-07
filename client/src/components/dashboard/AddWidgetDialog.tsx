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
    <Dialog open={open} onOpenChange={onOpenChange} data-oid="2-x562_">
      <DialogContent
        className="bg-space-900/95 border-space-700 text-white max-w-4xl"
        data-oid="e9vb2gt"
      >
        <DialogHeader data-oid="44fa7xz">
          <DialogTitle
            className="text-xl font-space text-white"
            data-oid="49imx-g"
          >
            Add Widgets to Dashboard
          </DialogTitle>
          <DialogDescription className="text-gray-400" data-oid="6z:ahbb">
            Select widgets to add to your dashboard. You can customize their
            position later.
          </DialogDescription>
        </DialogHeader>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          data-oid="l1yqu.h"
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
              data-oid="h871k.."
            >
              <div className="flex items-start gap-3" data-oid="fw41-n_">
                <div className="text-2xl text-cyan" data-oid="lh1kyor">
                  <i className={`fas ${widget.icon}`} data-oid="po8gmys"></i>
                </div>
                <div data-oid="apmc9i2">
                  <h3 className="text-white font-medium" data-oid="tuddjl8">
                    {widget.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1" data-oid="6g0.u55">
                    {widget.description}
                  </p>
                  {widget.disabled && (
                    <div
                      className="text-yellow-400 text-xs mt-2"
                      data-oid="1x4goex"
                    >
                      <i
                        className="fas fa-info-circle mr-1"
                        data-oid="ml_6b-2"
                      ></i>{" "}
                      Already on dashboard
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6 flex justify-end" data-oid="bs7v2qf">
          <button
            className="bg-space-800 text-white px-4 py-2 rounded hover:bg-space-700 mr-2"
            onClick={() => onOpenChange(false)}
            data-oid="r12aeu9"
          >
            Cancel
          </button>
          <button
            className="bg-purple-900 text-cyan px-4 py-2 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
            onClick={() => onOpenChange(false)}
            data-oid="_kq5fdo"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetDialog;
