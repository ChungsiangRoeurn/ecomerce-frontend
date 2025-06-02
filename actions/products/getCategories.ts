'use server';

import axios from 'axios';

export interface Category {
  id: string;
  category_name: string;
  // Add more fields if necessary
}

interface ApiResponse {
  success: boolean;
  data: Category[];
  message?: string;
}

export default async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<ApiResponse>(`${process.env.API_KEY_URL}/products/all-categories.php`);
    
    if (response.data.success) {
        console.log("Categories fetched successfully:", response.data.data);
      return response.data.data;
    } else {
      console.error("API error:", response.data.message);
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching categories:", error.message || error);
    return [];
  }
}
