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
    <ToastProvider data-oid="t5cx7rt">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props} data-oid=".dd84e:">
            <div className="grid gap-1" data-oid="zcu6_7n">
              {title && <ToastTitle data-oid="u7zwu22">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="xo1u7.5">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="4s5ka8n" />
          </Toast>
        );
      })}
      <ToastViewport data-oid=".qakir." />
    </ToastProvider>
  );
}
