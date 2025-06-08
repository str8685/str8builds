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
    <div className="absolute top-2 right-2 flex gap-1 z-10" data-oid="jp2p12a">
      <button
        className="text-gray-400 hover:text-white bg-space-900/70 p-1 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => {
          toast({
            title: "Edit Card",
            description: `Edit options for ${title} will be available soon.`,
          });
        }}
        data-oid="k6nyd6."
      >
        <i className="fas fa-cog text-xs" data-oid="c9p8b53"></i>
      </button>
      <button
        className="text-gray-400 hover:text-red-400 bg-space-900/70 p-1 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => onRemove(cardId)}
        data-oid="ziu4yiq"
      >
        <i className="fas fa-times text-xs" data-oid="-l5uflq"></i>
      </button>
    </div>
  );
};

export default CardEditControl;
