import React from 'react'
import { ApiSdk } from "@bandada/api-sdk";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateGroups = () => {

    const navigate = useNavigate()

    const apiSdk = new ApiSdk();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
 const [groupType, setGroupType] = useState("non-credential");
 const [credential, setCredential] = useState("github");
 const [followerCount, setFollowerCount] = useState("");
 const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814"

 const handleCreateGroup = async () => {
   const identity = localStorage.getItem("semaphoreIdentity");
   if (!identity) {
     alert("Please create an identity first.");
     return;
   }
    const credentials =
      groupType === "credential"
        ? {
            id:
              credential === "github"
                ? "GITHUB_FOLLOWERS"
                : "TWITTER_FOLLOWERS",
            criteria: { minFollowers: parseInt(followerCount, 10) || 1 },
          }
        : null;

   const groupCreateDetails = {
     name,
     description,
     treeDepth: 16,
     fingerprintDuration: 3600,
     credentials
   };

   try {
     const response = await apiSdk.createGroup(groupCreateDetails, apiKey);
     console.log("Group created:", response);
     alert("Group created successfully!");
     navigate("/all")
   } catch (error) {
     console.error("Error creating group:", error);
   }
 };


  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Create a New Group</h2>

        <div className="mb-4">
          <label className="block font-medium">Group Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter group name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter group description"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Group Type:</label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="non-credential">Non-Credential</option>
            <option value="credential">Credential-Based</option>
          </select>
        </div>

        {groupType === "credential" && (
          <>
            <div className="mb-4">
              <label className="block font-medium">Select Credential:</label>
              <select
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="github">GitHub Followers</option>
                <option value="twitter">Twitter Followers</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium">
                Minimum Follower Count:
              </label>
              <input
                type="number"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                className="border p-2 w-full"
                placeholder="Enter minimum follower count"
                min="1"
              />
            </div>
          </>
        )}

        <button
          onClick={handleCreateGroup}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Group
        </button>
      </div>
    </>
  );
}

export default CreateGroups
