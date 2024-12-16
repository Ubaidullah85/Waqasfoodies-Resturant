// utils/api.js
export const fetchItems = async () => {
  try {
    const response = await fetch('https://waqasfoodiesbackend-qyji.onrender.com/api/products'); // Update URL
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export const fetchItemDetails = async (id) => {
  try {
    const response = await fetch(`https://waqasfoodiesbackend-qyji.onrender.com/api/products/${id}`); // Update URL
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    return null;
  }
};
