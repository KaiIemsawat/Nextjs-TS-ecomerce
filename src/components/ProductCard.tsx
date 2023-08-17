import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product; // product type Product that come from prisma
}

function ProductCard({ product }: ProductCardProps) {
  // check if the item is newly added (in 7 days)
  // Date.now() - new Date(product.createdAt).getTime()
  // < 1000 * 60 * 60 * 24 * 7; which are milliseconds, seconds, minutes, hours, days
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={`/products/${product.id}`}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl" // come from both tailwindCSS and DaisyUI
    >
      <figure>
        <Image // tag from next.js
          src={product.imageUrl}
          alt={product.name}
          //   next.js will require the size of the image
          //   these number are the largest an image could be
          width={720}
          height={400}
          className="h-48 object-cover" // h-48 is the height of image
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {/* if this product is considerred new, then display 'NEW' badge */}
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}

export default ProductCard;
