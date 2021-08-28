const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface } = require('../compile'); 
const { bytecode } = require('../compile');

let accounts;
let inbox;


beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts() //wait for account to be done
    // await goes with async
    // Deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        // deploy byte code & pass on initial message
        .deploy({ data: bytecode, arguments: ['Hi there!'] }) //want to deploy a new copy
        // use account 0 and limit max gas at 1 million
        .send({ from: accounts[0], gas: '1000000' }) //instructs web3 to send out a transaction creating contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        //reference contact (inbox).Property(methods).method name(message())
        assert.equal(message, 'Hi there!');
    });
});


