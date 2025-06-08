import { FC } from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: string;
  className?: string;
}

const PageTitle: FC<PageTitleProps> = ({
  title,
  subtitle,
  icon,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`} data-oid="9gfneji">
      <div className="flex items-center gap-3 mb-2" data-oid="-3:xhw6">
        {icon && (
          <div
            className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center text-electric"
            data-oid="1x4qe9o"
          >
            <i className={`fas ${icon} text-xl`} data-oid="kahyc9_"></i>
          </div>
        )}
        <h1
          className="text-2xl md:text-3xl font-bold text-white"
          data-oid="k:36yy_"
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl" data-oid="jbfolfe">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
