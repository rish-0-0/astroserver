const router = require("express").Router();
const astroreha = require("astroreha");
router.post("/compatible", (req, res) => {
  try {
    return res
      .status(200)
      .send({
        message: "Information parsed",
        compatibility: astroreha.compatibility.areCompatibile(
          req.body.firstPerson,
          req.body.secondPerson
        ),
        success: true,
      });
  } catch (e) {
    return res.status(500).send({
      success: failed,
      message: "There is an error in the request or worst, in the package",
      e,
    });
  }
});

module.exports = router;
