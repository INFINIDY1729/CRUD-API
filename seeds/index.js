const mongoose = require("mongoose");
const details = require("../models/details");

const userdetail = require("../models/details");
const { username, name, tittle } = require("./seedhelper");

mongoose
  .connect("mongodb://localhost:27017/user-details", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Data Base connected");
  })
  .catch((err) => {
    console.log("oh no Mongo ERROR", err);
  });

const seedDB = async () => {
  await userdetail.deleteMany({});

  for (let i = 0; i < 30; i++) {
    const random = Math.floor(Math.random() * 32);
    const randomTittle = Math.floor(Math.random() * 19);
    let phoneNumber = Math.floor(Math.random() * 10 ** 10);

    if (phoneNumber < 10 ** 9) {
      phoneNumber += 10 ** 9;
    }

    const detail = new userdetail({
      username: `${username[random]}`,
      name: `${name[random]} ${tittle[randomTittle]}`,
      password: `${tittle[randomTittle]}${username[random]}@${random * 49}`,
      phonenumber: `${phoneNumber}`,
    });

    await detail.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
