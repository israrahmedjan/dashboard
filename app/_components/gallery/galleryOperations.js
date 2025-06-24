


const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
export async function getGallery(page=1,sort=1,search="",limit=4) {
   
    try {
console.log("Api Called Product", search)
  const queryString = new URLSearchParams({
      page,
      limit,
      sort,
      search,
    }).toString();

    const response = await fetch(`/api/gallery/listgallery?${queryString}`);

    // Agar response theek nahi hai (e.g. 404, 500)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log('gallery:', data);
   return data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}


export async function getgalleryById(id) {
   
    try {

  const queryString = new URLSearchParams({
      id,
    }).toString();

    console.log("Gallery ID", id);

    const response = await fetch(`${domain}/api/gallery/getgallerybyid?${queryString}`);

    // Agar response theek nahi hai (e.g. 404, 500)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log('Test Data=:', data);
   return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}


export async function deletegalleryById(id,imageID) {
  try {
    const queryString = new URLSearchParams({ id,imageID }).toString();

    const response = await fetch(`${domain}/api/gallery/deletegallery?${queryString}`, {
      method: "DELETE", // ✅ Important
    });

    // ✅ Optional: Handle non-OK response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Deleted Category Response:", data);

    return data; // return full object (or data.data if you're sure)
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return { success: false, message: error.message };
  }
}


export async function getCategories() {
   
    try {


    
    const response = await fetch(`${domain}/api/products/getCategories`);

    // Agar response theek nahi hai (e.g. 404, 500)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log('Test Data=:', data);
   return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}


export async function getProducts() {
   
    try {


    
    const response = await fetch(`${domain}/api/gallery/getproducts`);

    // Agar response theek nahi hai (e.g. 404, 500)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log('Test Data=:', data);
   return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}