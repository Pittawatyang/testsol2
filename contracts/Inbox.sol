pragma solidity >=0.4.25;

contract Inbox {
    string public message;

    function currentInbox(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
