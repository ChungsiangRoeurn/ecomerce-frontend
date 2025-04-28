import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  size: string;
}

const ProductCard = ({ name, price, image, size }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-indigo-900 truncate">
          {name}
        </h3>
        <p className="text-sm text-gray-600">{size}</p>
        <p className="text-xl font-bold text-amber-600 mt-2">
          ${Number(price).toFixed(2)}
        </p>
        <button className="mt-4 w-full bg-indigo-800 hover:bg-indigo-900 text-white py-2 rounded-md transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
