import React from 'react'
import { Identity } from "@semaphore-protocol/identity";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IdentityPage = () => {

const navigate = useNavigate()
const [identity, setIdentity] = useState("");

const generateIdentity = () => {
     if (!identity) {
       const newIdentity = new Identity();
       const identityString = newIdentity.commitment.toString();
       localStorage.setItem("semaphoreIdentity", identityString);
       console.log(identityString);
       setIdentity(identityString);
       alert("Semaphore Identity Created", identityString);
     } else {
       alert("Identity already exists.");
     }
  
  
  navigate("/create")
};

// useEffect(() => {
//   const savedIdentity = localStorage.getItem("semaphoreIdentity");
//   if (!savedIdentity) {
//     generateIdentity();
//   }
// }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Generate your Identity </h1>
      <button
        onClick={generateIdentity}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Identity
      </button>
    </div>
  );
}

export default IdentityPage
