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
router.post("/astrodetails", (req, res) => {
  try {
    const getBirthChart = astroreha.positioner.getBirthChart(
      req.body.firstPerson.dateString,
      req.body.firstPerson.timeString,
      req.body.firstPerson.lat,
      req.body.firstPerson.lng,
      req.body.firstPerson.timezone
    );
    return res.status(200).send({
      message: "Here is your birthChart",
      success: true,
      birthChart: getBirthChart,
      houses: astroreha.compatibility.getHousesOfChart(getBirthChart),
      navamsa: astroreha.positioner.getNavamsaChart(getBirthChart),
      nakshatra: astroreha.compatibility.calculateNakshatra(getBirthChart),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      success: false,
      message: "Invalid Data",
      e,
    });
  }
});

module.exports = router;
