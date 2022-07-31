// import React from "react";
// import { useState } from "react";
// import { useContext } from "react";
import { AreasContext } from "../../contexts/AreasContext";
import AddAreaForm from "../modals/modal_contents/addAreaForm";
import Modal from "../modals/modal";

import React, { useState, useMemo, useCallback, useRef, useContext, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from "./places";
import Places from "../places";
import { useLoadScript } from '@react-google-maps/api';
import ShowArea from "../modals/modal_contents/showArea";
import EditArea from "../modals/modal_contents/editArea";
import DeleteArea from "../modals/modal_contents/deleteArea";
// import { AreasContext } from "../contexts/AreasContext";

function Areas() {
  const { areas } = useContext(AreasContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [areaID, setAreaID] = useState()

  const [office, setOffice] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 14, lng: 121 }), [])
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

  const renderModalType = () => {
    switch (modalType) {
      case "show":
        return <ShowArea areaID={areaID}/>;
      case "edit":
        return <EditArea areaID={areaID}
        className="flex w-full h-full justify-center items-center text-sm"
        className2="basis-4/12"
        className3="basis-6/12 justify-start items-center flex pl-20"
        setShowModal={setShowModal}
        />;
      case "add":
        return <AddAreaForm
        className="flex w-full h-full justify-center items-center text-sm"
        className2="basis-4/12"
        className3="basis-6/12 justify-start items-center flex pl-20"
        showBackBtn={false}
        setShowModal={setShowModal}
      />;
      case "delete":
        return <DeleteArea areaID={areaID}/>
    }
  };

  if(!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-row h-full">

      <div className="overflow-hidden w-2/5">
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-40"
            className2="w-8/12 h-5/6 bg-white drop-shadow-2xl p-3"
          >
            {renderModalType()}
          </Modal>
        )}
        <div>Areas</div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="w-48">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        First
                      </th>
                      {/* <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Lat
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Lng
                      </th> */}
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas.map((area, index) => ( 
                      <tr className="border-b" key={index} onClick={()=>{console.log("clicked"); setOffice({lat: area.latitude, lng: area.longitude})}}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {area.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {area.name}
                        </td>
                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {area.latitude}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {area.longitude}
                        </td> */}
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            className="mr-5"
                            onClick={() => {
                              setShowModal(true);
                              setAreaID(area.id)
                              setModalType("show");
                            }}
                          >
                            Show
                          </button>
                          <button
                            className="mr-5"
                            onClick={() => {
                              setShowModal(true);
                              setAreaID(area.id);
                              setModalType("edit");
                            }}
                          >
                            Edit
                          </button>
                          <button className="mr-5"
                            onClick={() => {
                              setShowModal(true);
                              setAreaID(area.id);
                              setModalType("delete");
                            }}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <button
            className="rounded-full bg-slate-300 px-5 py-1 text-base"
            onClick={() => {
              setShowModal(true);
              setModalType("add");
            }}
          >
            Add Area
          </button>
        </div>
      </div>



      <div className="pl-5 basis-6/12 justify-center items-center flex">
        <div className=" border-2 border-black h-full w-full">
          <div className="map">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="map-container"
              options={options}
              onLoad={onLoad}
            >
              {/* {office && ( */}
              {areas && (
                <>
                  <Marker 
                    position={office} 
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  />
                  {/* { areas.map((area, index)=>(
                      <Circle center={{lat: area.latitude, lng: area.longitude}} radius={15000} options={closeOptions}/>
                  ))} */}
                  {/* <Circle center={{lat: 14.6760413, lng: 121.0437003}} radius={30000} options={middleOptions}/> */}
                  {/* <Circle center={office} radius={45000} options={farOptions}/> */}
                </>
              )} 
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

export default Areas;
