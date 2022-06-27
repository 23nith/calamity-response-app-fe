import React, { useState, useMemo, useCallback, useRef, useContext, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import { useLoadScript } from '@react-google-maps/api';
import { AreasContext } from "../contexts/AreasContext";

export default function Sign_up({setShowLogin, setShowSignUp, className, className2, showBackBtn}) {
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

  if(!isLoaded) return <div>Loading...</div>;
  return (
    
    <div className={className}>
      {/* <div className="basis-6/12 flex justify-end"> */}
      <div className={className2}>
        {/* <div className="mt-8 sm:w-full sm:max-w-md basis-6/12"> */}
        <div className="mt-8 sm:w-full sm:max-w-md basis-6/12">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6" action="#" method="POST">
              
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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                  <select name="area" id="area" className="">
                    <option value="">Please select</option>
                    {areas && areas.map((area, index) => (
                      <option value={area.name}>{area.name}</option>
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
                  <select name="role" id="role" className="">
                    <option value="">Please select</option>
                    <option value="user">User</option>
                    <option value="contact_person">Contact Person</option>
                  </select>
                </div>
              </div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showBackBtn? "Sign up": "Create User"}
                </button>
              </div>
              
              {showBackBtn && <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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