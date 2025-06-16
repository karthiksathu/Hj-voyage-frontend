import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "../components/layout/Footer";
 
const toolsData = [
  {
    name: "Taj Mahal",
    category: "India",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    alt: "Taj Mahal",
    description: "The Taj Mahal is a white marble mausoleum in Agra, India, built by Mughal emperor Shah Jahan.It is a UNESCO World Heritage Site and is considered one of the most beautiful buildings in the world.",
    delay: 0,
  },
   { name: "Ooty",
    category: "India",
    img: "https://s3.india.com/wp-content/uploads/2024/07/Historical-Places-To-Visit-In-Ooty.jpg?impolicy=Medium_Widthonly&w=800&h=541",
    alt: "Ooty",
    description: "Ooty is a hill station in the southern Indian state of Tamil Nadu. It is known for its scenic beauty, tea gardens, and pleasant climate.Ooty is often referred to as the 'Queen of Hill Stations'.",
    delay: 100,},
  {
    name: "Statue of Liberty",
    category: "USA",
    img: "https://cdn-imgix.headout.com/tour/30357/TOUR-IMAGE/6cdcf542-452d-4897-beed-76cf68f154e4-1act-de005e04-05d9-4715-96b0-6a089d5c3460.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces",
    alt: "Statue of Liberty",
    description: " The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York City. It was a gift from France to the United States and is a symbol of freedom and democracy.",
    delay: 200,
  },
  {
    name: "New York City",
    category: "USA",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/960px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
    alt: "New York City",
    description: "New York City is the largest city in the United States and is known for its iconic skyline, diverse culture, and vibrant arts scene. It is often referred to as 'The Big Apple'.",
    delay: 300,
  },
  {
    name: "Sydney Opera House",
    category: "Australia",
    img: "https://ychef.files.bbci.co.uk/1280x720/p0gp95cq.jpg",
    alt: "Sydney Opera House",
    description: "The Sydney Opera House is a multi-venue performing arts center in Sydney, Australia. It is one of the most recognizable and photographed buildings in the world.",
    delay: 400,
  },
  {
    name: "Gold Coast",
    category: "Australia",
    img: "https://i.guim.co.uk/img/media/fc7fd6ca8228d666efb528b5117a76bdf53ccdd6/739_968_4927_2957/master/4927.jpg?width=1200&quality=85&auto=format&fit=max&s=e7b320a500dfa9e2801f064d40193a3d",
    alt: "Gold Coast Skyline",
    description: " The Gold Coast is a coastal city in Queensland, Australia, known for its stunning beaches, surfing spots, and vibrant nightlife. It is a popular tourist destination.",
    delay: 500,
  },
  {
    name: "Melbourne",
    category: "Australia",
    img: "https://www.visitmelbourne.com/-/media/images/melbourne/things-to-do/nature-and-wildlife/beaches/brighton-beach/brighton-beach-bathing-boxes_mel_r_163906_1150x863.jpg?ts=20240513120436",
    alt: "Melbourne Skyline",
    description: " Melbourne is the capital city of Victoria, Australia. It is known for its cultural diversity, arts scene, and coffee culture. The city is often ranked as one of the most livable cities in the world.",
    delay: 600,
  },
  {
    name: "Eiffel Tower",
    category: "Europe",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    alt: "Eiffel Tower",
    description: " The Eiffel Tower is an iron lattice tower on the Champ de Mars in Paris, France. It is one of the most recognizable structures in the world and a global cultural icon of France.",
    delay: 700,
  },
  {
    name: "Berlin Wall",
    category: "Europe",
    img: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/berlin-wall-gettyimages-635937705?_a=BAVAZGDX0",
    alt: "Berlin Wall",
    description: " The Berlin Wall was a barrier that divided Berlin from 1961 to 1989. It was a symbol of the Cold War and the division between East and West Germany.",
    delay: 800,
  },
  {
    name: "Colosseum",
    category: "Europe",
    img: "https://www.thetrainline.com/cms/media/11558/italy-rome-colosseum.jpg?mode=crop&width=1080&height=1080&quality=70",
    alt: "Colosseum in Rome",
    description: "The Colosseum is an ancient amphitheater located in the center of Rome, Italy. It is one of the greatest works of Roman architecture and engineering and is a UNESCO World Heritage Site.",
    delay: 900,
  },
  {
    name: "Mount Fuji",
    category: "Japan",
    img: "https://static.wixstatic.com/media/11062b_672131e593c046dca2992ed5b00136b1~mv2.jpg/v1/fill/w_2500,h_1655,al_c/11062b_672131e593c046dca2992ed5b00136b1~mv2.jpg",
    alt: "Mount Fuji",
    description: "Mount Fuji is an active stratovolcano located on Honshu Island, Japan. It is the highest mountain in Japan and is a symbol of the country. Mount Fuji is a UNESCO World Heritage Site and is popular for hiking and photography.",
    delay: 1000,
  },
  {
    name: "Osaka Castle",
    category: "Japan",
    img: "https://cdn-imgix.headout.com/media/images/8bf2a66bc850615653867aebb013820c-Osaka%20Castle%204.jpg",
    alt: "Osaka Castle",
    description: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka. It played a major role in the unification of Japan during the sixteenth century and is one of Japan's most famous landmarks.",
    delay: 1100,
  },
  {
    name: "Great Wall of China",
    category: "China",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/960px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    alt: "Great Wall of China",
    description: "The Great Wall of China is a series of fortifications that stretch across northern China. It was built to protect against invasions and raids and is one of the most famous landmarks in the world.",
    delay: 1200,
  },
];
 
const Tourism: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState("All");
  const [modalData, setModalData] = React.useState<any | null>(null);
  const navigate = useNavigate();
 
  const filteredData =
    selectedCountry === "All"
      ? toolsData
      : toolsData.filter((item) => item.category === selectedCountry);
 
  const openModal = (item: any) => {
    setModalData(item);
  };
 
  const closeModal = () => {
    setModalData(null);
  };
 
   return (
      <>
    <Navbar />
    <div className="relative container mx-auto px-4 md:px-6 pt-24">
 
      {/* Header */}
      <h2 className="text-3xl font-bold mb-2 dark:text-white">
        {selectedCountry === "All" ? (
          <>
            <span className="text-navy dark:text-blue-300">Tourism </span>
            <span className="text-orange-600 dark:text-orange-400">Attraction</span>
          </>
        ) : (
          <span className="text-navy dark:text-blue-300">
            Tourist Spots in{" "}
            <span className="text-orange-600 dark:text-orange-400">{selectedCountry}</span>
          </span>
        )}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
        Come visit the most beautiful places in the world...
      </p>
  {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", "India", "USA", "Australia", "Europe", "Japan", "China"].map(
          (country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-full font-medium transition-colors
                ${
                  selectedCountry === country
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900"
                    : "bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                }`}
            >
              {country}
            </button>
          )
        )}
      </div>
   {/* Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-between shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all w-full aspect-square cursor-pointer"
            style={{ animationDelay: `${item.delay}ms` }}
            onClick={() => openModal(item)}
          >
            <div className="h-28 w-full mb-3 overflow-hidden rounded">
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-center text-gray-800 dark:text-gray-100 font-semibold text-sm">
              {item.name}
            </h3>
            <span className="text-xs text-[#1288d5] dark:text-sky-400 mt-1 text-center">
              {item.category}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate("/flights");
              }}
              className="mt-2 text-sm font-medium text-[#ff5722] dark:text-orange-400 cursor-pointer hover:underline"
            >
              Find Flights →
            </span>
          </div>
        ))}
      </div>
{/* Modal */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-xl dark:shadow-2xl relative flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              onClick={closeModal}
            >
              ✕
            </button>
 
            <img
              src={modalData.img}
              alt={modalData.alt}
              className="w-full h-48 object-cover rounded mb-4"
            />
 
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold mb-2 dark:text-white">{modalData.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{modalData.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    \<Footer />
  </>
  );
};
 
export default Tourism;
 