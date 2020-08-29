const router = require("express").Router();
const astroreha = require("astroreha");
router.post("/compatible", (req, res) => {
  try {
    return res.status(200).send({
      message: "Information parsed",
      compatibility: astroreha.compatibility.getCompatibilityScore(
        req.body.firstPerson,
        req.body.secondPerson
      ),
      success: true,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "There is an error in the request or worst, in the package",
      e,
    });
  }
});
router.post("/birthchart", (req, res) => {
  try {
    return res.status(200).send({
      message: "Here is your birthChart",
      success: true,
      birthChart: astroreha.positioner.getBirthChart(req.body.firstPerson),
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Invalid Data",
      e,
    });
  }
});

router.post("/navamsa", (req, res) => {
  try {
  } catch (e) {
    return res.status(500).send({
      message: "Invalid data",
      success: false,
      navamsaChart: astroreha.positioner.getNavamsaChart(req.body.birthChart),
    });
  }
});

router.post("/nakshatra", (req, res) => {
  try {
    return res.status(200).send({
      message: "Nakshatra",
      success: true,
      nakshatra: astroreha.compatibility.calculateNakshatra(
        req.body.birthChart
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Invalid data", success: false, e });
  }
});

module.exports = router;
