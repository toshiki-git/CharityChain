const Child = artifacts.require("ChildDonate");
const Developer = artifacts.require("DevelopDonate");
const Disaster = artifacts.require("DisasterDonate");
const Refugee = artifacts.require("RefugeeDonate");
const Region = artifacts.require("RegionDonate");
const Welfare = artifacts.require("WelfareDonate");

module.exports = (deployer) => {
  deployer.deploy(Child, { gas: 5000000 });
};
