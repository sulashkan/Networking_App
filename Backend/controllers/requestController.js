const { Connection } = require("mongoose");
const Request = require("../models/IntractionModel");
const userModel = require("../models/userModel");

exports.interested = async (req, res) => {
  const toId = req.params.id;
  const fromId = req.user.id;

  if (!toId) return res.status(400).json({ error: "toId error" });

  if (fromId === toId)
    return res.status(400).json({ error: "cant make friend" });

  try {
    const Interested = await Request.findOneAndUpdate(
      { from: fromId, to: toId },
      { action: "Interested" },
      { upsert: true, new: true }
    );

    if (!Interested) return res.status(400).json(" not found ");

    return res.status(200).json(Interested);
  } catch (error) {
    return res.status(500).json({ error: "Request error" });
  }
};

exports.ignorePost = async (req, res) => {
  try {
    const ignore = await Request.findOneAndUpdate(
      { from: req.user.id, to: req.params.id },
      { action: "Ignore" },
      { upsert: true, new: true }
    );

    if (!ignore) return res.status(400).json(" not found ");

   const ig = await userModel.findByIdAndUpdate(
      ignore.from,
      { $addToSet: { Ignore: ignore.to } },
      { new: true }
    );

    console.log("ig" ,ig);
  
    await userModel.findByIdAndUpdate(
      ignore.to,
      { $addToSet: { Ignore: ignore.from } },
      { new: true }
    );



    return res.status(200).json(ignore);
  } catch (error) {
    return res.status(500).json({ error: "ignore post error" });
  }
};

exports.acceptRequest = async (req, res) => {
  try {

    const accept = await Request.findOneAndUpdate(
      { _id: req.params.id, action: "Interested" },
      { action: "Accept" },
      { new: true }
    );

    if (!accept) return res.status(400).json(" not found ");

    await userModel.findByIdAndUpdate(
      accept.from,
      { $addToSet: { Connections: accept.to } },
      { new: true }
    );
  
    await userModel.findByIdAndUpdate(
      accept.to,
      { $addToSet: { Connections: accept.from } },
      { new: true }
    );

    return res.status(200).json(accept);
  } catch (error) {
    return res.status(500).json({ error: "acceptRequest err" });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const reject = await Request.findOneAndUpdate(
      { _id: req.params.id, action: "Interested" },
      { action: "Reject" },
      { new: true }
    );

    if (!reject) return res.status(400).json(" not found ");

    await userModel.findByIdAndUpdate(
       reject.from,
      { $pull: { Connections: reject.to } },
      { new: true }
    );
  
    await userModel.findByIdAndUpdate(
      reject.to,
      { $pull: { Connections: reject.from } },
      { new: true }
    );

    return res.status(200).json(reject);
  } catch (error) {
    return res.status(500).json({ error: "rejectRequest err" });
  }
};
