import Header from "../components/Header";
import Footer from "../components/Footer";
import RoomCard from "../components/Roomcard";

function HomePage() {
  const rooms = [
    {
      image: "/room-1.jpg",
      title: "Deluxe Room",
      description: "Spacious room with a king-sized bed and city view.",
      price: "$120/night",
    },
    {
      image: "/room-2.jpg",
      title: "Suite Room",
      description: "Luxurious suite with separate living area and balcony.",
      price: "$200/night",
    },
    {
      image: "/room-3.jpg",
      title: "Standard Room",
      description: "Cozy and affordable, perfect for a quick stay.",
      price: "$80/night",
    },
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-[url('/bg.jpg')] bg-cover bg-center text-white h-screen w-full ">
          <Header />

          {/* Star Icons and heading */}
          <div className="max-w-5xl mx-auto py-30 lg:py-60 grid">
            {/* Star icons */}
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1L12.2451 7.90983H19.5106L13.6327 12.1803L15.8779 19.0902L10 14.8197L4.12215 19.0902L6.36729 12.1803L0.489435 7.90983H7.75486L10 1Z"
                    fill="#B48761"
                  />
                </svg>
              ))}
            </div>

            {/* Heading and button */}
            <div className="text-center">
              <h1 className="text-6xl md:text-9xl text-white font-medium playfair">
                Book your dream vacation with us
              </h1>

              <button className="text-white bg-[#d1964e] hover:bg-[#866a47] mt-5 pl-8 py-3 w-40 rounded-full hover:cursor-pointer flex justify-self-center mb-4">
                Book now
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-16 max-w-[90%] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1f1306]">
            Our Rooms
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <RoomCard
                key={index}
                image={room.image}
                title={room.title}
                description={room.description}
                price={room.price}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
