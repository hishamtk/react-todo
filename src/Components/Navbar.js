function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="/"
                className="text-white px-3 py-2 rounded-md text-3xl font-semibold"
              >
                React To Do App
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
