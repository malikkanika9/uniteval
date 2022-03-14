const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/web15");
};

// Step 1 :- creating the schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type:String, required: true },
    middleName:{type: String, required:false},
    lastName: { type: String, required: true },
    age:{ type:Number ,required:true},
    email:{type:String ,required:true},
    address :{type: String, required: true},
    gender:{type:String, default:"female",required:false},
    type:{type:String, default:"customer",required:false},
    Rmanager:{type:String ,required:true},
    nominee:{type:String ,required:true}

  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

// Step 2 : creating the model
const User = mongoose.model("bankuser", userSchema); 

const branchSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    address : { type: String, required: true },
    IFSC :{type: String, required: true},
    MICR :{type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

const Branch = mongoose.model("branch", branchSchema); 
const savingaccountSchema = new mongoose.Schema(
  {
    acno :{type: String, required: true,unique:true},
    balance :{type: String, required: true},
    interestRate :{type: String, required: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankuser",
      required: true,
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const savngac= mongoose.model("saving", savingaccountSchema); 

const fixedaccountSchema = new mongoose.Schema(
  {
    acno :{type: String, required: true,unique:true},
    balance :{type: String, required: true},
    interestRate :{type: String, required: true},
    startDate :{type: String, required: true},
    maturityDate :{type: String, required: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankuser",
      required: true,
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const fixedac= mongoose.model("fixedaccount", fixedaccountSchema); 


const masteraccountSchema = new mongoose.Schema(
  {
    balance :{type: String, required: true},
    
    savingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "saving",
      required: true,
    },
    fixedaccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fixedaccount",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankuser",
      required: true,
    },
    branchId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const masterac= mongoose.model("masteraccount", masteraccountSchema);
//postcrud for user

app.post("/users", async (req, res) => {
  try {
    const author = await User.create(req.body);

    return res.status(201).send(bankuser);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//postcrud for saving
app.post("/savings", async (req, res) => {
  try {
    const saving = await savngac.create(req.body);

    return res.status(201).send(saving);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

////postcrud for fixedacc
app.post("/fixedaccount", async (req, res) => {
  try {
    const fixed = await Usefixedac.create(req.body);

    return res.status(201).send(fixed);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


app.get("masters", async (req, res) => {
  try {
    const user = await masteraccount.find()
      .populate({
        path: "bankuser",
      })
      .lean()
      .exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.listen(5000, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 5000");
});
