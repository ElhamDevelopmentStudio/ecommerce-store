import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (storeId: string): Promise<Billboard> => {
  const response = await fetch(`${URL}?storeId=${storeId}`);
  const billboards = await response.json();

  // Find the default billboard
  const defaultBillboard = billboards.find(
    (billboard: Billboard) => billboard.isDefault
  );

  // Return default billboard or first billboard if no default is set
  return defaultBillboard || billboards[0];
};

export default getBillboard;