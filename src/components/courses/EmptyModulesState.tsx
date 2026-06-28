import type { ReactNode } from "react";

type EmptyModulesStateProps = {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode;
};

export default function EmptyModulesState({
  title,
  description,
  actionText,
  onAction,
  children,
}: EmptyModulesStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 p-8 text-center dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {description}
      </p>

      {children}

      {actionText && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full bg-[#16423C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#123731] dark:bg-[#dcf36c] dark:text-[#16423C]"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}
