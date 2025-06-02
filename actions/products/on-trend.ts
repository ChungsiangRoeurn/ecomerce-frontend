'use server'
import axios from "axios";

export default async function getOnTrendProducts(catelog: string) {
  try {
    const response = await axios.get(`${process.env.API_KEY_URL}/products/prod-category.php?category=${catelog}`);
    const onTrendProducts = response.data.data;
    return onTrendProducts; // return the products data
  } catch (error) {
    console.error("Error fetching on-trend products:", error);
    return [];
  }
}