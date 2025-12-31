function Offers(){
const offers = [
{
id: 1,
title: "The Great Gatsby",
image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_lg.jpg",
oldPrice: 20.99,
newPrice: 12.99,
},
{
id: 2,
title: "Atomic Habits",
image: "https://elev8now.co.uk/wp-content/uploads/2024/02/Atomic-Habits-by-James-Clear.jpg",
oldPrice: 25.5,
newPrice: 18.99,
},
{
id: 3,
title: "Harry Potter: Book 1",
image : "https://lh3.googleusercontent.com/proxy/wACINbIRFqtHP6IJR_kCxOpMEcz6iTxboj4mAXuwJUB9h7iTsphzGcK7gCjddsCgeI6BHSf-EQDPjAD4m9rnLl4ieKXT8sqEAx5IW1q8Vl04IKRpi-Kn9bs76mfX9aSRiSJX9GotJ4-ci_XVrGpjAqWgngQeMJPg17Fle4cXj6n9bjGNUvUuYuuDzOEYUtQ0nxPLqr2k2UgREaXJMLumhpc",

oldPrice: 18.99,
newPrice: 14.99,
},
{
id: 4,
title: "1984",
image: "https://www.readerswarehouse.co.za/cdn/shop/files/9789386869388-_2_720x.jpg?v=1752684423",
oldPrice: 17.99,
newPrice: 10.99,
},
];


return (
<section className="min-h-screen bg-gray-100 p-10">
<h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
Special Offers
</h2>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
{offers.map((offer) => (
<div
key={offer.id}
className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition text-center"
>
<img
src={offer.image}
alt={offer.title}
className="w-full h-40 object-cover rounded-xl mb-4"
/>
<h3 className="text-xl font-semibold mb-2">{offer.title}</h3>


<p className="text-gray-500 line-through text-sm mb-1">
${offer.oldPrice}
</p>
<p className="text-indigo-700 text-xl font-bold mb-3">
${offer.newPrice}
</p>


<button className="bg-indigo-700 text-white px-5 py-2 rounded-xl hover:bg-indigo-800 transition">
Add to Cart
</button>
</div>
))}
</div>
</section>
);



}

export default Offers;