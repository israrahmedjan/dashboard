
const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
export async function GetProducts(page=1,limit=4,sort="",search="") {
   
    try {
console.log("My domain", domain)
  const queryString = new URLSearchParams({
      page,
      limit,
      sort,
      search,
    }).toString();

    const response = await fetch(`${domain}/api/products?${queryString}`);

    // Agar response theek nahi hai (e.g. 404, 500)
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    //console.log('products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}