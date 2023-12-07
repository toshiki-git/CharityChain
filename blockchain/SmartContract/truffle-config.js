module.exports = {
  networks: {
    geth: {
      host: "127.0.0.1",
      port: 7546,
      from: "0xe46efa37e07cdfb6293482069288eb55e35e6504",
      network_id: "1234",
    },
    ganache: {
      host: "172.23.112.1",
      port: 7545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
    },
  },
};
