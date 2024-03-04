const Expense = require("../models/expense");
const Download = require("../models/download");
const AWS = require("aws-sdk");

function uploadToS3(data, filename) {
  const BUCKET_NAME = "expensetracker000";
  const AWS_USER_KEY = process.env.AWS_USER_KEY;
  const AWS_USER_SECRET = process.env.AWS_USER_SECRET;

  const s3Bucket = new AWS.S3({
    accessKeyId: AWS_USER_KEY,
    secretAccessKey: AWS_USER_SECRET,
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, s3Response) => {
      if (err) {
        console.log("Something went wrong", err);
        reject(err);
      } else {
        console.log("sccess", s3Response);
        resolve(s3Response.Location);
      }
    });
  });
}

// donaload user's expense in txt file
exports.downloadExpense = async (req, res, next) => {
  try {
    const UserExpenses = await Expense.find({ userId: req.user });
    const stringifiedExpenses = JSON.stringify(UserExpenses);

    // filename will be Data & Time (different for each upload)
    // files is going in a folder --> named Expense-userId, for "Expense-${userId}/..."
    const userId = req.user._id;

    const filename = `Expense-${userId}/${new Date()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses, filename);
    console.log("Testing..", fileURL);

    const saveFileURLinDB = new Download({
      url: fileURL,
      userIdL: req.user,
    });
    await saveFileURLinDB.save();

    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    res.status(200).json({ fileURL: "", success: false });
    console.log(err);
  }
};
