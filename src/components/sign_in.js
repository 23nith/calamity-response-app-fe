import React, { useContext, useEffect, useState } from "react";
import { AreasContext } from "../contexts/AreasContext";
import { UserContext } from "../contexts/UserContext";

function Sign_in({showLogin, setShowLogin, setShowSignUp}) {
  const {setCurrentUser} = useContext(UserContext)
  const {setAreas} = useContext(AreasContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onUnmount = async () => {
    console.log("unmounted")
    fetch("https://calamity-response-be.herokuapp.com/current_user", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((res) => {
      if (res.ok) {
        console.log("response: ", res);
      }
      return res.json();
    })
    .then((data) => {
      console.log("data: ", data.role);
      localStorage.setItem("user_type", data.role);
      setCurrentUser(data);
      console.log("Updated current user: ", data.first_name)
    })
  }
  
  useEffect(() => {
    const getAreas = () => {
      fetch("https://calamity-response-be.herokuapp.com/areas", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res)=>{
        if(res.ok){
          return res.json()
        }else{
          throw new Error(res)
        }
      })
      .then((data)=>{
        console.log("areas data: ", data)
        setAreas(data)
      })
    } 
    getAreas();

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-in submit")
    const onLogin = () => {
      fetch("https://calamity-response-be.herokuapp.com/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        })
      })
      .then((res)=>{
        if(res.ok){
          console.log("res: ", res)
          localStorage.setItem("token", res.headers.get("Authorization"));
          onUnmount()
          return res.json();
        }else{
          throw new Error(res);
        }
      })
    }
    onLogin()
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
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
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
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
            </div>


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
