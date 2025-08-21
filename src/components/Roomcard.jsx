function RoomCard({ image, title, description, price }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-[#d1964e]">{price}</span>          
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
