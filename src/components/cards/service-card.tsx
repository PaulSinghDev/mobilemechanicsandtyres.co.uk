import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  title: string;
  image: string;
  description: string;
  link: {
    href: string;
    title: string;
    label: string;
  };
} & React.ComponentProps<typeof Card>;

export function ServiceCard({
  title,
  image,
  description,
  link,
  className,
  ...rest
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "bg-white rounded-lg shadow-md pt-0 overflow-hidden",
        className
      )}
      {...rest}
    >
      <CardHeader
        className={`min-h-60 bg-cover bg-center px-0`}
        style={{
          backgroundImage: image ? `url("${image}")` : undefined,
        }}
      >
        <CardTitle className="bg-gradient-to-br from-sky-700 to-sky-900 p-4 text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="line-clamp-3 text-ellipsis overflow-hidden">
        {description}
      </CardContent>
      <CardFooter>
        <Link
          href={link.href}
          title={link.title}
          className="text-sky-900 font-semibold hover:underline"
        >
          {link.label} →
        </Link>
      </CardFooter>
    </Card>
  );
}
