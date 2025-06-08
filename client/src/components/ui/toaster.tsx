import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="bpun_y-">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props} data-oid="z7i1bkn">
            <div className="grid gap-1" data-oid="srgtmmr">
              {title && <ToastTitle data-oid="0y7g7km">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="5cye-6f">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="9.o5vob" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="8j-xf4v" />
    </ToastProvider>
  );
}
