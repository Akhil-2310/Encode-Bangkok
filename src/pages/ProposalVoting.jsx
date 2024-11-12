import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ProposalVotingAbi from "./ProposalVotingAbi.json"; // Replace with the actual ABI

const ProposalVoting = () => {
  const contractAddress = "0xF40A87284C64e008Bff039179d92777CB3Adf734"; // Replace with your deployed contract address
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          // Request account access if not already connected
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Initialize provider and signer
          const newProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          setProvider(newProvider);
          await provider.send("eth_requestAccounts", []);
          const signer = newProvider.getSigner();

          // Initialize contract instance
          const proposalContract = new ethers.Contract(
            contractAddress,
            ProposalVotingAbi,
            signer
          );
          setContract(proposalContract);

          console.log("Contract initialized successfully.");
        } catch (error) {
          console.error("Failed to initialize provider or contract:", error);
        }
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  }, []);

  const fetchProposals = async () => {
    if (contract) {
      const proposalsList = [];
      const count = await contract.proposalCount();
      for (let i = 1; i <= count; i++) {
        const proposal = await contract.getProposal(i);
        proposalsList.push({
          id: i,
          title: proposal[0],
          description: proposal[1],
          votes: proposal[2].toNumber(),
        });
      }
      setProposals(proposalsList);
    }
  };

  useEffect(() => {
    if (contract) fetchProposals();
  }, [contract]);

  const handleCreateProposal = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      const tx = await contract.createProposal(title, description);
      await tx.wait();
      fetchProposals();
      setTitle("");
      setDescription("");
      alert("Proposal created successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const handleVote = async (id) => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      const tx = await contract.vote(id);
      await tx.wait();
      fetchProposals();
      alert("Voted successfully!");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Proposals</h2>

      {/* Proposal List */}
      <div className="mb-4">
        {proposals.length > 0 ? (
          <ul className="space-y-4">
            {proposals.map((proposal) => (
              <li key={proposal.id} className="border p-4 rounded">
                <h3 className="text-lg font-bold">{proposal.title}</h3>
                <p>{proposal.description}</p>
                <p>Votes: {proposal.votes}</p>
                <button
                  onClick={() => handleVote(proposal.id)}
                  className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No proposals available.</p>
        )}
      </div>

      {/* Proposal Creation Form */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Create a New Proposal</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleCreateProposal}
          className="bg-green-500 text-white p-2 rounded"
        >
          Create Proposal
        </button>
      </div>
    </div>
  );
};

export default ProposalVoting;
