import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  [key: string]: string | number;
}

interface Props {
  formData: FormData;
  onChange: (id: string, value: string | number) => void;
}

export function ProductForm({ formData, onChange }: Props) {
  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "price", label: "Price ($)", type: "number", step: "0.01", min: "0" },
    { id: "description", label: "Description", type: "text" },
    { id: "stock", label: "Stock", type: "number", min: "0" },
  ];

  return (
    <form className="space-y-4">
      {fields.map(({ id, label, ...rest }) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name={id}
            value={(formData[id] as string | number) || ""}
            onChange={(e) => onChange(id, e.target.value)}
            required={id === "name"}
            {...rest}
          />
        </div>
      ))}
    </form>
  );
}
