import { FC } from "react";
import { toast } from "@/hooks/use-toast";

interface CardEditControlProps {
  cardId: string;
  title: string;
  onRemove: (id: string) => void;
}

const CardEditControl: FC<CardEditControlProps> = ({
  cardId,
  title,
  onRemove,
}) => {
  return (
    <div className="absolute top-2 right-2 flex gap-1 z-10" data-oid="l6esuag">
      <button
        className="text-gray-400 hover:text-white bg-space-900/70 p-1 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => {
          toast({
            title: "Edit Card",
            description: `Edit options for ${title} will be available soon.`,
          });
        }}
        data-oid="y42.u3."
      >
        <i className="fas fa-cog text-xs" data-oid="qcwc12_"></i>
      </button>
      <button
        className="text-gray-400 hover:text-red-400 bg-space-900/70 p-1 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => onRemove(cardId)}
        data-oid="bp7c.:v"
      >
        <i className="fas fa-times text-xs" data-oid="pumy:0d"></i>
      </button>
    </div>
  );
};

export default CardEditControl;
