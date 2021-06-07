const assert = require('chai').assert;

const PLANE = require('../Planes/Plane');
const MILITARY_PLANE = require('../Planes/militaryPlane');
const PASSENGER_PLANE = require('../Planes/passengerPlane');
const AIRPORT = require('../Airport');
const MILITARY_TYPE = require('../models/MilitaryType');
const EXPERIMENTAL_PLANE = require('../Planes/experimentalPlane');
const EXPERIMENTAL_TYPES = require('../models/ExperimentalTypes');
const CLASSIFICATION_LEVEL = require('../models/ClassificationLevel');

describe("find plane with max capacity", () => {

    let planes = [
        new PASSENGER_PLANE('Boeing-737', 900, 12000, 60500, 164),
        new PASSENGER_PLANE('Boeing-737-800', 940, 12300, 63870, 192),
        new PASSENGER_PLANE('Boeing-747', 980, 16100, 70500, 242),
        new PASSENGER_PLANE('Airbus A320', 930, 11800, 65500, 188),
        new PASSENGER_PLANE('Airbus A330', 990, 14800, 80500, 222),
        new PASSENGER_PLANE('Embraer 190', 870, 8100, 30800, 64),
        new PASSENGER_PLANE('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PASSENGER_PLANE('Bombardier CS300', 920, 11000, 60700, 196),
        new MILITARY_PLANE('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MILITARY_PLANE('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MILITARY_PLANE('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MILITARY_PLANE('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MILITARY_PLANE('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MILITARY_PLANE('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new EXPERIMENTAL_PLANE("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new EXPERIMENTAL_PLANE("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];
    let planeWithMaxPassengerCapacity = new PASSENGER_PLANE('Boeing-747', 980, 16100, 70500, 242);

    it("should have military Planes with transport type", () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        assert.isFalse(
            transportMilitaryPlanes.includes(
                (plane) => plane.getMilitaryType() !MilitaryType.TRANSPORT
            )
        );
    });

    it("should check passenger plane with max capacity", () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.isFalse(expectedPlaneWithMaxPassengersCapacity == planeWithMaxPassengerCapacity);
    });

    it("find passenger plane with max capacity", () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
        let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            if (currentPlane.getMinLoadCapacity() > nextPlane.getMinLoadCapacity()) {
                nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
                break;
            }
        }
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    });

    it("Has At Least One Bomber In Military Planes', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        let flag = false;
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MilitaryType.BOMBER) {
                flag = true;
            } else {
                assert.fail("Test failed!");
            }
        }
    }); it("should check that experimentsl planes has classification level higher than unclassified", () => {
    let airport = new Airport(planes);
    let bomberMilitaryPlanes = airport.getExperimentalPlanes();
    let hasUnclassifiedPlanes = false;
    for (let experimentalPlane of bomberMilitaryPlanes) {
        if (experimentalPlane.classificationLevel === ClassificationLevel.UNCLASSIFIED) {
            hasUnclassifiedPlanes = true;
        }
        assert.isFalse(hasUnclassifiedPlanes);
    }
});
});