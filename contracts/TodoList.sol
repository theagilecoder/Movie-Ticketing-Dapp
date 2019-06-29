pragma solidity ^0.5.0;

// Smart Contract to create movie tickets
contract TodoList {
  // Counter to maintain number of booked tickets
  uint public taskCount = 0;

  // Ticket Details
  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  constructor() public {
    // createTask("Movie1 @ 3pm");
  }

  // Event to broadcast booking of a ticket
  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  // Book movie ticket
  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }
}