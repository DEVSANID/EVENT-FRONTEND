const CollegeCard = ({ college, darkMode }) => {
    return (
      <div className={`rounded-2xl overflow-hidden ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <img
          src={college.photo}
          alt={college.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{college.name}</h3>
          <p className="text-sm"><strong>Rating:</strong> {college.rating}</p>
          <p className="text-sm"><strong>Location:</strong> {college.location}</p>
        </div>
      </div>
    );
  };
  
  export default CollegeCard;
  