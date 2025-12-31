export const BookCard = ({ book }) => {
    console.log(book);
return (
<div className="border rounded-2xl p-5 shadow-lg bg-white hover:scale-105 hover:shadow-xl transition-transform duration-300 w-72">
<img
src={book.image}
alt={book.title}
className="rounded-xl mb-4 w-full h-48 object-cover"
/>
<h2 className="text-xl font-semibold mb-1">{book.title}</h2>
<p className="text-gray-700 text-sm mb-1">Author: {book.author}</p>
<p className="text-gray-500 text-sm mb-2">{book.description}</p>
<p className="text-indigo-700 font-bold text-lg mb-3">${book.price}</p>
<button className="w-full bg-indigo-700 text-white py-2 rounded-xl hover:bg-indigo-800 transition">
Add to Cart
</button>
</div>
);
};