import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  // Need to be this specific name 'searchParams'
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  // setup variables for pages and number of items in each page
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" }, // sorting by id, DESC (note, in MongoDB, ids will sort the same way as timestamps)
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  // To verify if the item has been add within 7 days
  const isNew =
    Date.now() - new Date(products[0].createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
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
              <p className="py-6 text-slate-600">{products[0].description}</p>
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
      )}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* products.slice(1).map((product) <---- map products start with index '1' */}
        {/* (currentPage === 1 ? products.slice(1) : products).map((product) => () <--- this is a trick to use turnary operator before map*/}
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
