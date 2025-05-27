const express = require('express')
const cors = require("cors");
const middleware = require('./middleware');
const app = express()
const port = 3000
const admin = require("./config/firebase-config")

class User {
  constructor(email, uid, createdAt, pfp = "", userName = "", bio = "") {
    this.email = email
    this.uid = uid
    this.createdAt = createdAt
    this.pfp = pfp
    this.userName = userName
    this.bio = bio
  }
}

async function addUser(uid, email) {
  const db = admin.firestore(); // get Firestore instance
  const userRef = db.collection("users").doc(uid);
  await userRef.set({
    uid: uid,
    email: email,
    createdAt: new Date()
  });
}

async function addProfile(uid ,userName, pfp, bio){
  const db = admin.firestore();
  const userRef = db.collection("users").doc(uid);
  await userRef.set({
    userName: userName,
    pfp: pfp,
    bio: bio
  }, {merge: true})
}

async function getUser(uid) {
  const db = admin.firestore();
  const userRef = db.collection("users").doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    throw new Error("User not found");
  }

  return doc.data();
}

async function createPost(){
  const imageRef = ref(storage, "posts")
}

app.use(express.json({ limit: '10mb' }))
app.use(cors());
app.use(middleware.decodeToken)

app.get('/api/getUser', async (req, res) => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized or missing UID" });
  }

  try {
    const userData = await getUser(uid);
    console.log("Sent User Info")
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "User not found" });
  }
})


app.post("/api/addUser", async (req, res) => {
  const uid = req.user?.uid
  const email = req.body?.email

  if (uid && email) {
    await addUser(uid, email);
    console.log(email+ " has been added.")
    return res.status(200).json({ message: "Many many good" })
  }
  else {
    return res.status(300).json({ message: "Didn't recieve user" })
  }

})

app.post("/api/addProfile", async (req, res)=>{
  const uid = req.user?.uid
  
  if(req.body.userName){
    await addProfile(uid, req.body.userName, req.body.pfp, req.body.bio);
    console.log("Sent: "+ req.body.userName)
    return res.status(200).json({message: "Many Good"})
  }
  else{
    return res.status(300).json({message: "Didn't receive user"})
  }

})

app.post("/api/createPost", async(req, res) =>{
  const uid = req.user?.uid
  if(req.body.imageFile && req.body.desc){
    // add image to storage
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})