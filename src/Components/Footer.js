import React from "react";

export default function Footer(props) {
  return (
    <>
      <footer className=" w-full  bg-gray-900 pb-6">
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-center justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-center text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.hishamtk.com"
                  className="text-white hover:text-gray-400 text-base font-semibold py-1"
                >
                  Hisham
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
