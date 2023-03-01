pragma solidity ^0.8.17;

contract myContract{
    uint private value;
    function setValue(uint _value) public {
        value=_value;
    }

    function getValue() public view returns(uint){
        return value;
    }
}