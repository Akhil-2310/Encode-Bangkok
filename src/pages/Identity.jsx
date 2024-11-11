import React from 'react'
import { Identity } from "@semaphore-protocol/identity";

const Identity = () => {
const generateIdentity = () => {
  const identity = new Identity();
  const identityString = identity.commitment.toString();
  localStorage.setItem("semaphoreIdentity", identityString);
  alert("Semaphore Identity Created");
};

useEffect(() => {
  const savedIdentity = localStorage.getItem("semaphoreIdentity");
  if (!savedIdentity) {
    generateIdentity();
  }
}, []);

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

export default Identity
