import "./App.css";
import { Route } from "react-router-dom";
import Success from "./components/success";
import Failed from "./components/failed";
import Sidebar from "./components/sidebar";
import Sign_in from "./components/sign_in";
import Sign_up from "./components/sign_up";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import UserContextProvider from "./contexts/UserContext";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <UserContextProvider>
        {showLogin && (
          <Route
            exact
            path="/"
            render={(props) => (
              <Sign_in
                {...props}
                setShowLogin={setShowLogin}
                showLogin={showLogin}
                setShowSignUp={setShowSignUp}
              />
            )}
          />
        )}
        {showSignUp && (
          <Route
            exact
            path="/"
            render={(props) => (
              <Sign_up
                {...props}
                setShowLogin={setShowLogin}
                setShowSignUp={setShowSignUp}
              />
            )}
          />
        )}
        {!showLogin && !showSignUp && (
          <div className="flex">
            <Sidebar setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
            <div className="text-2xl font-semibold flex-1 h-screen">
              <div className="border-b-2 border-b-grey flex flex-row justify-end">
                <div className="px-5 py-2 flex flex-row">
                  <div className="flex flex-col justify-end text-dark-grey">
                    <div className="text-md text-end">User Name</div>
                    <div className="text-sm text-end">account settings</div>
                  </div>

                  <BiUserCircle
                    className="flex justify-items-center items-center ml-2 text-dark-grey"
                    size={52}
                  />
                </div>
              </div>

              <div className="p-7">
                <Route exact path="/success" component={Success} />
                <Route exact path="/failed" component={Failed} />
              </div>
            </div>
          </div>
        )}
      </UserContextProvider>
    </>
  );
}

export default App;
