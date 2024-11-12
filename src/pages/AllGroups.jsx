import React from 'react'
import { useEffect, useState } from "react";
import { ApiSdk } from "@bandada/api-sdk";

const AllGroups = () => {

    
const apiSdk = new ApiSdk()

  const [groups, setGroups] = useState([]);
  const [inviteCode, setInviteCode] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814";
  const adminId =
  "0x078ca966cb82a1b9efa8c6e8a3c5129cbbb2b768c9ae96d43805651675cccf32";

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiSdk.getGroupsByAdminId(adminId);
        setGroups(response);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleJoinWithInviteCode = async (groupId) => {
    try {
      const memberId = localStorage.getItem("semaphoreIdentity");
      if (!memberId) {
        alert("Please create an identity first.");
        return;
      }

      await apiSdk.addMemberByInviteCode(groupId, memberId, inviteCode);
      alert("Joined group successfully using invite code!");
    } catch (error) {
      console.error("Error joining group with invite code:", error);
      alert("Failed to join group with invite code.");
    }
  };

  const handleJoinWithApiKey = async (groupId) => {
    try {
      const memberId = localStorage.getItem("semaphoreIdentity");
      if (!memberId) {
        alert("Please create an identity first.");
        return;
      }

      await apiSdk.addMemberByApiKey(groupId, memberId, apiKey);
      alert("Joined group successfully using API key!");
    } catch (error) {
      console.error("Error joining group with API key:", error);
      alert("Failed to join group with API key.");
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">All Groups</h2>
        {groups.length > 0 ? (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li key={group.id} className="border p-4 rounded">
                <h3 className="text-lg font-bold">{group.name}</h3>
                <p className="text-gray-700">{group.description}</p>
                {group.credentials ? (
                  <p className="text-sm text-gray-600 mt-2">
                    Credential:{" "}
                    {group.credentials.id?.replace("_", " ") || "N/A"} - Min
                    Requirement:{" "}
                    {group.credentials.criteria?.minFollowers ||
                      "N/A"}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">
                    No credential requirements
                  </p>
                )}

                {/* Join via Bandada Link */}
                <a
                  href={`https://client.bandada.pse.dev?credentialGroupId=${group.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  Join via Bandada Link
                </a>

                {/* Join via Invite Code */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter Invite Code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="border p-2 mr-2"
                  />
                  <button
                    onClick={() => handleJoinWithInviteCode(group.id)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Join with Invite Code
                  </button>
                </div>

                {/* Join via API Key */}
                <div className="mt-4">
                  <button
                    onClick={() => handleJoinWithApiKey(group.id)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Join with API Key
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No groups available.</p>
        )}
      </div>
    </>
  );
}

export default AllGroups


