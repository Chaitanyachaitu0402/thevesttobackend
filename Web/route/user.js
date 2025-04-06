const userService = require('../services/user');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storege/userdp")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + path.extname(file.originalname));
            }
        }
    )
var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    }
);

// CREATE USER

router.post('/create-user', upload.single("profilepic"), async (req, res) => {
    const response = await userService.createUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// LOGIN 

router.post('/login-user', async (req, res) => {
    const response = await userService.userLogin(req.body);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// UPDATE USER

router.post('/update-user', upload.single("profilepic"), async (req, res) => {
    const response = await userService.updateUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


router.post('/update-user-by-name', upload.single("profilepic"), async (req, res) => {
    const response = await userService.updateUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// DELETE USER

router.post('/delete-user-by-id', async (req, res) => {
    const response = await userService.deleteUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET USER

router.post('/get-user-by-id', async (req, res) => {
    const response = await userService.getUserById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


router.post('/get-user-by-role', async (req, res) => {
    const response = await userService.getUserByRole(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// get address by user_id

router.post('/get-user-by-address', async (req, res) => {
    const response = await userService.getUserByAddressByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-permissions-by-email', async (req, res) => {
    const response = await userService.getPermissionsByemail(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/check-email', async (req, res) => {
    const response = await userService.checkEmail(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL USERS 

router.get('/get-all-user', async (req, res) => {
    const response = await userService.getAllUser(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-all-user', async (req, res) => {
    const response = await userService.getAllUser(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH USER DETAILS

router.post('/search-user', async (req, res) => {
    const response = await userService.searchUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.post('/count-user', async (req, res) => {
    const response = await userService.countUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// LOGGED

router.get("/get-logged-in-user-details", async (req, res) => {
    let response = await userService.getLoginUserDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

router.get("/get-logged-in-user-by-username", async (req, res) => {
    let response = await userService.getLoginUserByusername(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// REFRESH TOKEN

router.get("/refresh-token", async (req, res) => {
    let response = await userService.generateAccessTokenUsingRefreshToken(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// RESET PASSWORD

router.post("/reset-password", async (req, res) => {
    let response = await userService.resetPassword(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// FORGOT PASSWORD

router.post("/forgot-password", async (req, res) => {
    let response = await userService.forgotPassword(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});


const mailchimp = require("@mailchimp/mailchimp_marketing");


mailchimp.setConfig({
  apiKey:process.env.MAILCHIMP_API_KEY,
  server:process.env.MAILCHIMP_SERVER_PREFIX,
});

router.post("/api/subscribe", async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const listId = process.env.MAILCHIMP_LIST_ID;
  
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      });
      res.status(200).json(response);
    } catch (err) {
      console.error("Error subscribing user: ", err); // Log the error for debugging
      res.status(500).json({
        message: "Failed to subscribe user",
        error: err.response ? err.response.body : err.message,
      });
    }
  });
  

module.exports = router;