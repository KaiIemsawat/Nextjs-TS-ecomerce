import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" }, // sorting by id, DESC (note, in MongoDB, ids will sort the same way as timestamps)
  });

  // To verify if the item has been add within 7 days
  const isNew =
    Date.now() - new Date(products[0].createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-xl"
            priority // tell nextJS that this image should be load first
          />
          <div>
            <h1 className="text-4xl font-bold">{products[0].name}</h1>
            {/* if this product is considerred new, then display 'NEW' badge */}
            {isNew && <div className="badge badge-secondary">NEW</div>}
            <p className="py-6">{products[0].description}</p>
            {/*
            Use <Link> that would act like <Button> because this component is not declare as "use client" 
            So, this component basicaly is a server component
            */}
            <Link
              href={`/products/${products[0].id}`}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* products.slice(1).map((product) <---- map products start with index '1' */}
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
