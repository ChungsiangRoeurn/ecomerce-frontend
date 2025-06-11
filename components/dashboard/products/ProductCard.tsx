import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard({
  title,
  value,
  desc,
}: {
  title: string;
  value: string | number;
  desc: string;
}) {
  return (
    <Card className="shadow bg-white">
      <CardHeader>
        <CardTitle className="text-rose-800">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="text-3xl font-semibold text-rose-900">
        {value}
      </CardContent>
    </Card>
  );
}
