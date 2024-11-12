import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GroupDetails() {

  const { groupId } = useParams();
  
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814"; // Replace with your actual Bandada API key

  // Function to fetch the group by ID
  const getGroupById = async (groupId) => {
    const endpoint = `https://api.bandada.pse.dev/groups/${groupId}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching group: ${response.statusText}`);
      }

      const data = await response.json();
      setGroupDetails(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch group details on component mount
  useEffect(() => {
    getGroupById(groupId);
  }, [groupId]);

  // Render loading, error, or group details
  if (loading) {
    return <p>Loading group details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Group Details</h2>
      {groupDetails ? (
        <div className="border p-4 rounded">
          <h3 className="text-lg font-bold">Group Name: {groupDetails.name}</h3>
          <p className="text-gray-700">Group Description: {groupDetails.description}</p>
          
        </div>
      ) : (
        <p>No group details available.</p>
      )}
    </div>
  );
}

export default GroupDetails;
