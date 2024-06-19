// src/components/Page/UserProfile/Test.jsx

const Test = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-md">
        {/* User Info Header */}
        <div className="bg-gray-200 text-center py-4 rounded-t-md">
          <img
            src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
            alt="User Avatar"
            className="rounded-full w-24 h-24 border-4 border-white mx-auto -mt-12"
          />
          <h2 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        {/* Form Content */}
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Họ
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue={user.firstName}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue={user.lastName}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                disabled
              />
            </div>
            <div className="flex justify-end">
              {/* Save Changes Button */}
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
