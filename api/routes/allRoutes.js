const express = require("express");
const router = express.Router();

const divisionController = require("../controllers/divisionController");
const districtController = require("../controllers/districtController");
const upazilaController = require("../controllers/upazilaController");

// Division Routes
router.post("/divisions", divisionController.createDivision);
router.get("/divisions", divisionController.getAllDivisions);
router.get("/divisions/:id", divisionController.getDivisionById);
router.put("/divisions/:id", divisionController.updateDivision);
router.delete("/divisions/:id", divisionController.deleteDivision);

// District Routes
router.post("/districts", districtController.createDistrict);
router.get("/districts", districtController.getAllDistricts);
router.get("/districts/:id", districtController.getDistrictById);
router.put("/districts/:id", districtController.updateDistrict);
router.delete("/districts/:id", districtController.deleteDistrict);
router.get("/districts/by-division/:divisionId", districtController.getDistrictsByDivision);


// Upazila Routes
router.post("/upazilas", upazilaController.createUpazila);
router.get("/upazilas", upazilaController.getAllUpazilas);
router.get("/upazilas/:id", upazilaController.getUpazilaById);
router.put("/upazilas/:id", upazilaController.updateUpazila);
router.delete("/upazilas/:id", upazilaController.deleteUpazila);
router.get("/upazilas/by-district/:districtId", upazilaController.getUpazilasByDistrict);

module.exports = router;
