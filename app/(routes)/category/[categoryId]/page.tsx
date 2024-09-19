import React from "react";
import getCategory from "@/actions/GetCategory";
import getColors from "@/actions/GetColors";
import getProducts from "@/actions/GetProducts";
import getSizes from "@/actions/GetSizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";
import Filter from "./_components/Filter";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ProductCard";
import MobileFilters from "./_components/MobileFilters";

export const revalidate = 0;

type Props = {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
};

const CategoryIdPage = async ({ params, searchParams }: Props) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Container>
        <div className="mb-8">
          <Billboard data={category.billboard} />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:gap-x-12">
            <aside className="lg:w-1/4 mb-8 lg:mb-0">
              <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md sm:hidden lg:block">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Filters
                </h2>
                <div className="hidden lg:block space-y-8">
                  <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                  <Filter valueKey="colorId" name="Colors" data={colors} />
                </div>
              </div>
            </aside>
            <main className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex items-center gap-x-4 mb-8 mt-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {category.name}
                    </h1>
                    <MobileFilters sizes={sizes} colors={colors} />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Sort by</span>
                    <select className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
              {products.length === 0 ? (
                <NoResults />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="transform transition duration-300 hover:scale-105"
                    >
                      <ProductCard data={item} />
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryIdPage;