function Authors (){

const authors = [
{
id: 1,
name: "J.K. Rowling",
image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4O1bTe0jhDw0paGFMRqMWYmAzt7EU6QZug&s",
},
{
id: 2,
name: "George Orwell",
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqzp3_avFlTDfMOaqCKlgiOcC_KmwdJKzng&s",
},
{
id: 3,
name: "James Clear",
image: "https://denisonbigred.com/images/2024/4/23/james-clear.png",
},
{
id: 4,
name: "Agatha Christie",
image: "https://assets.cdn.bbcmaestro.com/d9a167143ba9d4273487527cde054cf0.jpg",
},
];


return (
<section className="min-h-screen bg-gray-100 p-10">
<h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
Top Authors
</h2>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
{authors.map((author) => (
<div
key={author.id}
className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-xl transition"
>
<img
src={author.image}
alt={author.name}
className="w-32 h-32 rounded-full object-cover mb-4"
/>
<h3 className="text-xl font-semibold text-gray-800 mb-2">
{author.name}
</h3>

</div>
))}
</div>
</section>
);

}
export default Authors;