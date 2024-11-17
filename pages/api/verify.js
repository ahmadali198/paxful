// // pages/api/verifyrecoverycode.js
// import clientPromise from "../../lib/mongodb";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { email, recoveryCode } = req.body;

//   console.log("Received email:", email);
//   console.log("Received recovery code:", recoveryCode);

//   try {
//     const client = await clientPromise;
//     const db = client.db("paxful");

//     const user = await db.collection("users").findOne({ email });

//     if (!user) {
//       console.log("User not found");
//       return res.status(400).json({ error: "Invalid email or recovery code." });
//     }

//     const { recoveryCode: storedCode, expirationTime } = user;

//     console.log("Stored recovery code:", storedCode);
//     console.log("Stored expiration time:", expirationTime);

//     if (storedCode !== recoveryCode) {
//       console.log("Recovery code does not match");
//       return res.status(400).json({ error: "Invalid recovery code." });
//     }

//     const now = new Date();
//     if (now > expirationTime) {
//       console.log("Recovery code has expired");
//       return res.status(400).json({ error: "Recovery code has expired." });
//     }

//     res.status(200).json({ message: "Code verified successfully." });
//   } catch (err) {
//     console.error("Error verifying recovery code:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// }

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, recoveryCode } = req.body;

  if (!email || !recoveryCode) {
    return res
      .status(400)
      .json({ error: "Email and recovery code are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("paxful"); // Replace with your database name
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or recovery code." });
    }

    const { recoveryCode: storedCode, recoveryCodeExpiration } = user;

    // Check if the recovery code has expired
    const now = new Date();
    if (now > new Date(recoveryCodeExpiration)) {
      // Remove expired code from the database
      await usersCollection.updateOne(
        { email },
        { $unset: { recoveryCode: "", recoveryCodeExpiration: "" } }
      );
      return res.status(400).json({ error: "Recovery code has expired." });
    }

    // Compare the provided code with the stored code
    if (storedCode !== parseInt(recoveryCode, 10)) {
      return res.status(400).json({ error: "Invalid recovery code." });
    }

    res.status(200).json({ message: "Recovery code verified successfully." });
  } catch (error) {
    console.error("Error verifying recovery code:", error);
    res
      .status(500)
      .json({
        error: "Failed to verify recovery code. Please try again later.",
      });
  }
}
