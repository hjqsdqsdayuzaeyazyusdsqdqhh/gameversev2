interface SectionHeaderProps {
  title: string;
  highlight?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, highlight, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          {highlight ? (
            <>
              <span className="text-gradient-simple">{highlight}</span> {title}
            </>
          ) : (
            title
          )}
        </h2>
        {description && <p className="text-gray-400 text-sm mt-1.5">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
