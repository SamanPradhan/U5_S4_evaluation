const validator = async (req, res, next) => {
  const { ip } = req.params;
  const regex =
    /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
  if (!regex.test(ip)) {
    res.status(400).send({ msg: "invalid ip address" });
    return;
  }

  next();
};
module.exports = { validator };
