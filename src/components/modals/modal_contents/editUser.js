import React, { useState, useMemo, useCallback, useRef, useContext, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from "./places";
import { useLoadScript } from '@react-google-maps/api';
import { AreasContext } from "../../../contexts/AreasContext";
import Places from "../../places";


export default function EditUser({userID, setShowLogin, setShowSignUp, className, className2, showBackBtn}) {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [areaID, setAreaID] = useState()
  const [role, setRole] = useState("user")
  
  const [address, setAddress] = useState("address")
  const {areas} = useContext(AreasContext);
  const [office, setOffice] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 14, lng: 121 }), []);
  const options = useMemo(
    () => ({
      mapId: "4ec731b64a3fcc1b",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), [])

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDeKZ22Ds5bgHpeUgBU3_qQHSBPRyYQDbY",
    libraries: ["places"]
  });

  const handleBack = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log("to be submitted", {
      // email,
      // password,
      // area_id: areaID,
      // address,
      // first_name: firstName,
      // last_name: lastName,
      // longitude: office?.lng,
      // latitude: office?.lat,
      // role: showBackBtn ? "user" : role
    // })
    fetch("http://localhost:3000/edit_account", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          area_id: areaID,
          address,
          first_name: firstName,
          last_name: lastName,
          longitude: office?.lng,
          latitude: office?.lat,
          role: showBackBtn ? "user" : role
        }
      })
    })
    .then((res)=>{
      if(res.ok){
        return res.json();
      }
    })
    .then((data)=>{
      if(showBackBtn){
        setShowSignUp(false)
        setShowLogin(true)

      }
      return data
    })
  }

  useEffect(() => {
    fetch("http://localhost:3000/account", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id: userID
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log("User: ", data)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setAreaID(data.area_id)
      setEmail(data.email)
      setAddress(data.address)
      setLongitude(data.longitude)
      setLatitude(data.latitude)
      setOffice({lat: data.latitude, lng: data.longitude})
      return data
    })
  }, [])
  

  if(!isLoaded) return <div>Loading...</div>;
  return (
    
    <div className={className}>
      {/* <div className="basis-6/12 flex justify-end"> */}
      <div className={className2}>
        {/* <div className="mt-8 sm:w-full sm:max-w-md basis-6/12"> */}
        <div className="mt-8 sm:w-full sm:max-w-md basis-6/12">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6" action="#" method="POST" onSubmit={handleOnSubmit}>
              
              <div>
                <label
                  for="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autocomplete="first_name"
                    required
                    value={firstName}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    onChange={(e)=>{setFirstName(e.target.value)}}
                  />
                </div>
              </div>

              <div>
                <label
                  for="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autocomplete="last_name"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    value={lastName}
                    onChange={(e)=>{setLastName(e.target.value)}}
                  />
                </div>
              </div>

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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
              </div>

              {/* <div>
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
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </div>
              </div>

              <div>
                <label
                  for="confirm_password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autocomplete="current-password"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                  />
                </div>
              </div> */}

              <div>
                <label
                  for="confirm_password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {/* Latitude */}
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="hidden"
                    value={office?.lat}
                    autocomplete="current-password"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    onChange={(e)=>{setLatitude(e.target.value)}}
                  />
                </div>
              </div>

              <div>
                <label
                  for="confirm_password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {/* Longitude */}
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="hidden"
                    value={office?.lng}
                    autocomplete="current-password"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    onChange={(e)=>{setLongitude(e.target.value)}}
                  />
                </div>
              </div>

              <div>
                <label
                  for="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="hidden"
                    autocomplete="address"
                    value={address}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                  <Places setOffice={(position) => {
                    setOffice(position);
                    mapRef.current?.panTo(position);
                  }}
                    setAddress={setAddress}
                  />
                </div>
              </div>

              <div>
                <label
                  for="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <div className="mt-1">
                  <select name="area" id="area" className="" required onChange={(e)=>{setAreaID(e.target.value)}}>
                    {areas && areas.map((area, index) => (
                      <option value={area.id} selected={area.id == areaID ? true : false}>{area.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {!showBackBtn && <div>
                <label
                  for="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="mt-1">
                  <select name="role" id="role" className="" onChange={(e)=>{setRole(e.target.value)}}>
                    {/* <option value="" selected disabled>Please select</option> */}
                    <option value="user" selected={role == "user" ? true : false}>User</option>
                    <option value="contact_person" selected={role == "contact_person" ? true : false}>Contact Person</option>
                  </select>
                </div>
              </div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  {showBackBtn? "Sign up": "Create User"}
                </button>
              </div>
              
              {showBackBtn && <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>}

            </form>
          </div>
        </div>
      </div>


      {/* <div className="basis-6/12 h-screen justify-start items-center flex pl-20"> */}
      <div className="basis-6/12 h-screen justify-center items-center flex pl-20">
        <div className=" border-2 border-black h-3/6 w-4/6">
          <div className="map">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="map-container"
              options={options}
              onLoad={onLoad}
            >
              {office && <Marker position={office} />}
            </GoogleMap>
          </div>
        </div>
      </div>

    </div>
  );
}


const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};