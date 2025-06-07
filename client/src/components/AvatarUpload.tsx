import { FC, useState, useRef, ChangeEvent, useEffect } from "react";

interface AvatarUploadProps {
  initials: string;
  className?: string;
}

const AvatarUpload: FC<AvatarUploadProps> = ({ initials, className = "" }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load avatar from localStorage on component mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Save avatar to state and localStorage
          setAvatar(result);
          localStorage.setItem("userAvatar", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={triggerFileInput}
      data-oid="qyp3jow"
    >
      {avatar ? (
        <div
          className="h-12 w-12 rounded-full overflow-hidden"
          data-oid="cdojsc4"
        >
          <img
            src={avatar}
            alt="User avatar"
            className="h-full w-full object-cover"
            data-oid="8:b7oxs"
          />
        </div>
      ) : (
        <div
          className="h-12 w-12 rounded-full bg-purple-800 flex items-center justify-center text-cyan font-medium text-lg"
          data-oid="eh558ws"
        >
          {initials}
        </div>
      )}

      {isHovering && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-60 border-2 border-cyan animate-pulse"
          data-oid=":jfzu-v"
        >
          <div
            className="bg-cyan bg-opacity-90 rounded-full p-1"
            data-oid="27sqvob"
          >
            <span className="text-space-900 text-sm" data-oid="b.rzlod">
              <i className="fas fa-camera" data-oid="1pstgmg"></i>
            </span>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        data-oid="vglfrit"
      />
    </div>
  );
};

export default AvatarUpload;
