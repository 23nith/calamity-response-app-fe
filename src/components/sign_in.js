import React from "react";

function Sign_in({showLogin, setShowLogin, setShowSignUp}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-in submit")
    setShowLogin(!showLogin)
  } 

  const handleSignUp = () => {
    setShowSignUp(true)
    setShowLogin(false)
  }

  return (
    <div className="flex w-screen h-screen flex justify-center items-center">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="mb-0 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label for="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* <div>
              <label
                for="company-size"
                className="block text-sm font-medium text-gray-700"
              >
                Company size
              </label>
              <div className="mt-1">
                <select name="company-size" id="company-size" className="">
                  <option value="">Please select</option>
                  <option value="small">1 to 10 employees</option>
                  <option value="medium">11 to 50 employees</option>
                  <option value="large">50+ employees</option>
                </select>
              </div>
            </div> */}

            {/* <div className="flex items-center">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
                className=""
              />
              <label
                for="terms-and-privacy"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms
                </a>
                and
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
                .
              </label>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>

            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign_in;
