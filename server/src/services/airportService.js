const { getAirportsList, getAirportById } = require('../data/airports');

function listAirports() {
  return getAirportsList();
}

function getAirport(id) {
  return getAirportById(id);
}

module.exports = {
  listAirports,
  getAirport
};

