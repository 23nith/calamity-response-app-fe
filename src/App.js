import "./App.css";
import { Route } from "react-router-dom";
import Success from "./components/success";
import Failed from "./components/failed";
import Sidebar from "./components/sidebar";
import Sign_in from "./components/sign_in";
import Sign_up from "./components/sign_up";
import { useCallback, useContext, useEffect, useState } from "react";
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
import Navbar from "./components/navbar";
import DonationsContextProvider from "./contexts/DonationsContext";
import Reports from "./components/sidebar/reports";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false)

  return (
    <div className="select-none">
      <UsersContextProvider>
        <AreasContextProvider>
          <NeedsContextProvider>
            <CalamitiesContextProvider>
              <DonationsContextProvider>
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

                <Route
                  exact
                  path="/success"
                  // component={Success}
                  render={(props) => (
                    <Success
                      {...props}
                      setShowLogin={setShowLogin}
                      setShowPaymentStatus={setShowPaymentStatus}
                    />
                  )}
                />

                <Route
                  exact
                  path="/failed"
                  // component={Success}
                  render={(props) => (
                    <Failed
                      {...props}
                      setShowLogin={setShowLogin}
                      setShowPaymentStatus={setShowPaymentStatus}
                    />
                  )}
                />
                
                {!showLogin && !showSignUp && !showPaymentStatus && (
                  <div className="flex">
                    <Sidebar
                      setShowLogin={setShowLogin}
                      setShowSignUp={setShowSignUp}
                    />
                    <div className="text-2xl font-semibold flex-1 h-screen">
                      <Navbar />

                      <div className="p-7 h-5/6">
                        {/* <Route exact path="/failed" component={Failed} /> */}
                        <Route exact path="/areas" component={Areas} />
                        <Route exact path="/reports" component={Reports} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/needs" component={Needs} />
                        <Route exact path="/donations" component={Donations} />
                        <Route exact path="/calamities" component={Calamities} />
                        <Route exact path="/messages" component={Messages} />
                      </div>
                    </div>
                  </div>
                )}
              </DonationsContextProvider>
            </CalamitiesContextProvider>
          </NeedsContextProvider>
        </AreasContextProvider>
      </UsersContextProvider>
    </div>
  );
}

export default App;
