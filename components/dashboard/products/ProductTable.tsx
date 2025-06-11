import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/type";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  formatPrice: (price: number) => string;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
  formatPrice,
}: Props) {
  return (
    <Table className="w-full text-center">
      <TableHeader>
        <TableRow>
          {["Name", "Price", "Description", "Stock", "Actions"].map((h) => (
            <TableHead key={h} className="text-center">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{formatPrice(p.price)}</TableCell>
            <TableCell>{p.description}</TableCell>
            <TableCell>{p.stock}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
