const bcrypt = require("bcrypt");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

// // Create a new user
// exports.createUser = async (req, res) => {
//   const { Email, FullName, DateN, DateI, cin, role } = req.body;
//   const Password = "" //generate password with generate-password package
//   try {
//     const existingUser = await User.findOne({ Email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists." });
//     const result = await User.create({
//       Email,
//       Password,
//       FullName,
//       DateI,
//       DateN,
//       cin,
//       role,
//     });
//     // sent email with credential to the newly created user with nodemailler package
//     res.status(200).json({ result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.createUser = async (req, res) => {
  const { Email, FullName, DateN, DateI, cin, role } = req.body;
  const Password = require("generate-password").generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
  });
  try {
    const existingUser = await User.findOne({ Email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });
    const result = await User.create({
      Email,
      Password,
      FullName,
      DateI,
      DateN,
      cin,
      role,
    });
    const transporter = require("nodemailer").createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "your_email@example.com", /////////--------------------------------- email
        pass: "your_password", /////////--------------------------------- password  mtt3333 l account
      },
    });
    const mailOptions = {
      from: '"JCI BEMBLA" <your_email@example.com>', // adress elli bch tab3th baha
      to: Email, // receiver address
      subject: "Welcome to our app", // sujet
      text: `Hello ${FullName},\n\nYour account has been created successfully.\n\nYour email: ${Email}\nYour password: ${Password}\n\nPlease change your password after logging in.\n\nThank you for choosing our app.`, // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // if the mail doesn't send
        console.log(error);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        // check if the mail is valid
        if (info.accepted.length > 0 && info.rejected.length === 0) {
          // the mail is valid and accepted by the receiver
          console.log("Email sent: " + info.response);
          res.status(200).json({ result });
        } else {
          // the mail is invalid or rejected by the receiver
          console.log("Email rejected: " + info.response);
          res.status(400).json({ message: "Invalid or rejected email" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { Email, Password, FullName, DateN, DateI, cin, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { Email, Password, FullName, DateI, DateN, cin, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({role:user.role, Email:user.Email,FullName:user.FullName }, process.env.SECRET_CODE, {
      expiresIn: "1h", // Set the expiration time for the token
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update user information (member)
exports.updateUserInformation = async (req, res) => {
  const userId = req.userId; // Assuming the user's ID is extracted from the authenticated request
  const { FullName, DateOfBirth, CIN } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user information
    user.FullName = FullName;
    user.DateOfBirth = DateOfBirth;
    user.CIN = CIN;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: "User information updated successfully.", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create multiple users
exports.createUsers = async (req, res) => {
  const users = req.body;

  try {
    // Check if any of the users already exist
    const existingUsers = await User.find({ Email: { $in: users.map((user) => user.Email) } });
    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map((user) => user.Email);
      return res.status(400).json({ message: `Users with the following emails already exist: ${existingEmails.join(", ")}` });
    }

    // Create the users
    const createdUsers = await User.create(users);

    res.status(200).json({ message: "Users created successfully.", users: createdUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPasswordByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // check if the user exists
    if (user) {
      // generate a random password 
      const newPassword = generatePassword.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
      });
      // update the user's password with the new one
      user.password = newPassword;
      await user.save();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "your_email@gmail.com", // your gmail account
          pass: "your_password", // your gmail password
        },
      });
      // create an email options object with the user's email, subject, and text
      const mailOptions = {
        from: "your_email@gmail.com", // your gmail account
        to: user.email, // the user's email
        subject: "Password Reset", // the email subject
        text: `Your password has been reset. Your new password is ${newPassword}. Please log in and change your password as soon as possible.`, // the email text
      };
      // send the email using the transporter and the mail options
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // handle the error and send a failure response
          console.log(error);
          res.status(500).json({ message: "Failed to send email" });
        } else {
          // send a success response with the user and the email info
          res.status(200).json({
            message: "Password reset successfully and email sent",
            user,
            info,
          });
        }
      });
    } else {
      // send a not found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // handle the error and send a failure response
    console.log(error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};


exports.updatePassword = async (req, res) => {
  // get the email, old password, and new password from the request body
  const { email, oldPassword, newPassword } = req.body;
  try {
    // find the user by email from the database using the User model
    const user = await User.findOne({ email });
    // check if the user exists
    if (user) {
      // compare the old password with the user's hashed password using bcrypt
      const match = await bcrypt.compare(oldPassword, user.password);
      // check if the passwords match
      if (match) {
        // hash the new password using bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // update the user's password with the hashed password
        user.password = hashedPassword;
        // save the user to the database
        await user.save();
        // send a success response with the user
        res
          .status(200)
          .json({ message: "Password updated successfully", user });
      } else {
        // send a bad request response
        res.status(400).json({ message: "Old password is incorrect" });
      }
    } else {
      // send a not found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // handle the error and send a failure response
    console.log(error);
    res.status(500).json({ message: "Failed to update password" });
  }
};