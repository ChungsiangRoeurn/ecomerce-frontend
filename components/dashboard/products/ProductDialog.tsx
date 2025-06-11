import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { Product } from "@/hooks/type";

type ProductFormData = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ProductFormData;
  onChange: (id: string, value: string | number) => void;
  onSave: () => void;
  editingProduct: Product | null;
}

export function ProductDialog({
  open,
  onOpenChange,
  formData,
  onChange,
  onSave,
  editingProduct,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm formData={formData} onChange={onChange} />
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
