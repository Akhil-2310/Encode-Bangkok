// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProposalVoting {
    struct Proposal {
        string title;
        string description;
        uint256 votes;
        bool exists;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    // Events for frontend listening
    event ProposalCreated(uint256 proposalId, string title, string description);
    event Voted(uint256 proposalId, uint256 votes);

    // Function to create a proposal
    function createProposal(string memory _title, string memory _description) public {
        proposalCount += 1;
        proposals[proposalCount] = Proposal(_title, _description, 0, true);
        emit ProposalCreated(proposalCount, _title, _description);
    }

    // Function to vote on a proposal by ID
    function vote(uint256 _proposalId) public {
        require(proposals[_proposalId].exists, "Proposal does not exist");
        proposals[_proposalId].votes += 1;
        emit Voted(_proposalId, proposals[_proposalId].votes);
    }

    // Function to get a proposal's details
    function getProposal(uint256 _proposalId) public view returns (string memory, string memory, uint256) {
        require(proposals[_proposalId].exists, "Proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.title, proposal.description, proposal.votes);
    }
}
