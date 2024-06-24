import { useState } from "react";

// Mock data for story
const story = {
  title: "My Story",
  description:
    "This is my amazing story. It spans multiple chapters and covers various adventures. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lobortis, lorem in egestas suscipit, nisi mauris venenatis nisi, sit amet lacinia dui felis non libero. Integer et elit consectetur, placerat mi et, lobortis felis. Nulla facilisi. Proin tincidunt diam nec felis luctus, et consectetur elit elementum. Cras ultrices libero eget nunc efficitur bibendum. Sed viverra, sem quis varius sodales, ipsum nulla feugiat metus, id laoreet odio ligula sed est. Nullam dapibus quam in arcu molestie, ut ultricies felis accumsan. Suspendisse potenti. Vivamus sit amet dolor ipsum. Ut pretium venenatis justo nec scelerisque. In hac habitasse platea dictumst. Integer nec sem ac eros efficitur tempus vel in odio.",
  imageUrl: "https://via.placeholder.com/150", // Example image URL
};

// Mock data for story chapters
const storyChapters = [
  { id: 1, title: "Chapter 1", content: "Lorem ipsum dolor sit amet..." },
  { id: 2, title: "Chapter 2", content: "Consectetur adipiscing elit..." },
  // Add more chapters as needed
];

const StoryDetailPage = () => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left section: Chapters and navigation */}
      <div className="lg:w-3/4 bg-gray-100 p-4 lg:p-8 overflow-y-auto">
        {/* List of Chapters */}
        {storyChapters.map((chapter) => (
          <div key={chapter.id} className="bg-white rounded-lg shadow-lg p-4 lg:p-8 mb-8">
            <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
            <p className="text-gray-700">{chapter.content}</p>
          </div>
        ))}
      </div>

      {/* Right section: Description */}
      <div className="lg:w-1/4 bg-white p-4 lg:p-8">
        <div className="mb-4">
          {/* Story image and title */}
          <div className="mb-4 text-center">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="rounded-lg mb-4 max-w-full h-auto mx-auto"
              style={{ maxWidth: "200px" }}
            />
            <h2 className="text-lg font-semibold">{story.title}</h2>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Story Description</h3>
            {showDescription ? (
              <p className="text-gray-700">{story.description}</p>
            ) : (
              <p className="text-gray-700">{story.description.slice(0, 100)}...</p>
            )}
          </div>
        </div>
        <button
          onClick={toggleDescription}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {showDescription ? "Ẩn đi" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default StoryDetailPage;
