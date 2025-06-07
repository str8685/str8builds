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
    <div className={`mb-6 ${className}`} data-oid="l5835i-">
      <div className="flex items-center gap-3 mb-2" data-oid="hy.0e-r">
        {icon && (
          <div
            className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center text-electric"
            data-oid="8:-_qyr"
          >
            <i className={`fas ${icon} text-xl`} data-oid="uiqyum2"></i>
          </div>
        )}
        <h1
          className="text-2xl md:text-3xl font-bold text-white"
          data-oid="hj_gxt_"
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl" data-oid="l8e1h2e">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
