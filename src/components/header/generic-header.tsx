import { cn } from "@/lib/utils";

export function GenericHeader({
  title,
  copy,
  image,
  className,
}: {
  title: string;
  copy?: string;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-32 bg-sky-950 bg-cover bg-center relative",
        image
          ? "before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-sky-950 before:opacity-90"
          : undefined,
        className
      )}
      style={{
        backgroundImage: image ? `url("${image}")` : undefined,
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-4 px-4">
        <h1 className="relative z-20 text-white text-4xl font-bold text-center">
          {title}
        </h1>
        {copy ? (
          <p className="text-center font-light text-sky-100 relative z-20">
            {copy}
          </p>
        ) : null}
      </div>
    </div>
  );
}
