const express = require("express");
const sequelize = require('./db/database.js');
const User = require('./models/User')

//Update database
sequelize.sync({ /*Use to force the sync on database*/ force: true}).then(() => console.log('db is ready'))

const app = express();

app.use(/*this is middle ware*/express.json());

//Uses then instead of await
// app.post('/users', (req, res) => {
//   User.create(req.body).then(() => {
//     res.send('user is inserted')
//   })
// })


//This uses await instead of .then func
app.post('/users', async (req, res) => {
  await User.create(req.body); //first
    res.send('user is inserted');//after first happens. this is old .then func.
})

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
})

app.get('/users/:id', async (req, res) => {
  const reqID = req.params.id;
  const user = await User.findOne({where: {id: reqID}});
  res.send(user);
})

app.put('/users/:id', async (req, res) => {
  const reqID = req.params.id;
  const user = await User.findOne({where: {id: reqID}});
  user.username = req.body.username;
  await user.save();//saves a thing in database
  res.send("updated");
})

app.delete('/users/:id', async (req, res) => {
  const reqID = req.params.id;
  await User.destroy({where: {id: reqID}});
  res.send("removed");
})

app.listen(3000, () => {
  console.log("app is running");
});