import Image from 'next/image'

interface ProductCardProps {
    name: string
    price: string
    image: string
    size: string
  }
  
  const ProductCard = ({ name, price, image, size }: ProductCardProps) => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative mb-2 bg-gray-100 rounded-md p-4 w-full h-40 flex items-center justify-center">
          <div className="absolute top-0 right-0 bg-yellow-400 px-2 py-1 text-xs font-bold">
            {size}
          </div>
          <div className="relative h-32 w-32">
            <Image src={image} alt={name} fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
        <h3 className="text-xs font-medium text-center">{name}</h3>
        <p className="text-xs font-bold">${price}</p>
      </div>
    )
  }
  export default ProductCard