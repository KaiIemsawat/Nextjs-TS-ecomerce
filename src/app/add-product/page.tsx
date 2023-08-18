import FormSubmitBtn from "@/components/FormSubmitBtn";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

// This will change page title only on this page
export const metadata = {
  title: "Add Product - AmaZukk",
};

async function addProduct(formData: FormData) {
  "use server"; // <-- this tell NextJs that this is for server

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signIn?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString(); // when use .get(thisValue), the value in () came from attribute name="thisValue"
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  // Error test
  // throw Error("Error test!!!");

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signIn?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
          type="text"
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
          type="url"
        />
        <input
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
          type="number"
          step="0.01"
        />
        <FormSubmitBtn className="btn-block">Add Product</FormSubmitBtn>
      </form>
    </div>
  );
};

export default AddProductPage;
