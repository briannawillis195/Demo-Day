const CommunityForum = require("../models/communityforum");



module.exports = {
  getMessage: async (req, res) => {
    try {
      const messages = await CommunityForum.find();
      res.render("communityforum.ejs", { messages: messages, user: req.user });
    } catch (err) {
      console.log(err);
    }
},

postMessage: async (req, res) => {
  try {
    let date = new Date().toString();


    await CommunityForum.create({
      user: req.user.id,
      name: req.body.name.trim(),
      message: req.body.message,
      date: date.substring(0, 21),

    });

   
    const messages = await CommunityForum.find();


    res.render("communityforum.ejs", { messages, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
},
replyToMessage: async (req, res) => {
  try {
    const date = new Date().toString();

    await CommunityForum.create({
      user: req.user.id,
      name: req.body.name.trim(),
      message: req.body.message,
      date: date.substring(0, 21),
      reply: true,
      response: req.body.response,
    });

    console.log("Reply saved to database");
    res.redirect("/communityforum");
  } catch (err) {
    console.error(err);
    res.redirect("/communityforum");
  }
},
deleteMessage: async (req, res) => {
  try {
    const { id } = req.params;


    await CommunityForum.findByIdAndDelete(id);

    res.redirect("/communityforum");
  } catch (err) {
    console.error(err);
    res.redirect("/communityforum");
  }
},
}
