import "./App.css";
import { Route } from "react-router-dom";
import Success from "./components/success";
import Failed from "./components/failed";
import Sidebar from "./components/sidebar";
import Sign_in from "./components/sign_in";
import Sign_up from "./components/sign_up";
import { useContext, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import UserContextProvider, { UserContext } from "./contexts/UserContext";
import AreasContextProvider from "./contexts/AreasContext";
import Areas from "./components/sidebar/areas";
import Users from "./components/sidebar/users";
import Needs from "./components/sidebar/needs";
import Donations from "./components/sidebar/donations";
import Calamities from "./components/sidebar/calamities";
import Messages from "./components/sidebar/messages";
import UsersContextProvider from "./contexts/UsersContext";
import NeedsContextProvider from "./contexts/NeedsContext";
import CalamitiesContextProvider from "./contexts/CalamitiesContext";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const {currentUser} = useContext(UserContext);

  return (
    <>
      <UsersContextProvider>
        <AreasContextProvider>
          <NeedsContextProvider>
            <CalamitiesContextProvider>
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
                      className="flex w-screen h-screen justify-center items-center p-10"
                      className2="basis-6/12 flex justify-end"
                      showBackBtn={true}
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
                          <div className="text-md text-end">{currentUser.first_name}</div>
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
                      <Route exact path="/areas" component={Areas} />
                      <Route exact path="/users" component={Users} />
                      <Route exact path="/needs" component={Needs} />
                      <Route exact path="/donations" component={Donations} />
                      <Route exact path="/calamities" component={Calamities} />
                      <Route exact path="/messages" component={Messages} />
                    </div>
                  </div>
                </div>
              )}
            </CalamitiesContextProvider>
          </NeedsContextProvider>
        </AreasContextProvider>
      </UsersContextProvider>
    </>
  );
}

export default App;
