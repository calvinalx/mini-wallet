const express = require("express")
const cors = require("cors")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")

const app = express()
const router = express.Router()
const upload = multer()
const port = process.env.PORT || 8080

// Wallet State
const customerId = "ea0212d3-abd6-406f-8c67-868e814a2436"
const token = "cb04f9f26632ad602f14acef21c58f58f6fe5fb55a"
let wallet = {
  id: "c4d7d61f-b702-44a8-af97-5dbdafa96551",
  owned_by: "6ef31975-67b0-421a-9493-667569d89556",
  enabled_at: undefined,
  disabled_at: undefined,
  balance: 0,
  status: false,
}
let referenceIds = []

// Middleware
const checkWalletStatus = (_, res, next) => {
  if (!wallet.status) {
    res.status(400).json(generateError("Wallet is currently disabled."))
    return
  }
  next()
}

const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization) {
    const currentToken = authorization.split(" ")[1]
    if (token === currentToken) next()
  } else {
    res.sendStatus(401)
  }
}

// Utils
const generateError = (error) => {
  return {
    status: "fail",
    data: { error },
  }
}

app.use(cors())
app.use(upload.array())

// Set Route prefix
app.use("/api/v1", router)

// DEBUG: Get wallet state
app.get("/", (_, res) => {
  res.json({
    wallet,
    token,
    referenceIds,
  })
})

// Initialize my account for wallet
router.post("/init", (req, res) => {
  const { customer_xid } = req.body

  if (!customer_xid) {
    res.status(400).json(
      generateError({
        customer_xid: ["Missing data for required field."],
      })
    )
    return
  }

  if (customer_xid !== customerId) {
    res.status(404).json(generateError("Invalid Customer ID."))
    return
  }

  res.json({
    data: { token },
    status: "success",
  })
})

// View wallet balance
router.get("/wallet", [authenticate, checkWalletStatus], (_, res) => {
  res.json({
    data: {
      wallet: {
        id: wallet.id,
        owned_by: wallet.owned_by,
        status: wallet.status,
        enabled_at: wallet.enabled_at,
        balance: wallet.balance,
      },
    },
    status: "success",
  })
})

// Add virtual money to my wallet
router.post(
  "/wallet/deposits",
  [authenticate, checkWalletStatus],
  (req, res) => {
    const { amount, reference_id } = req.body

    if (!referenceIds) {
      res.status(400).json(generateError("Reference ID is required."))
      return
    }
    if (referenceIds.includes(reference_id)) {
      res.status(400).json(generateError("Reference ID must be unique"))
      return
    }

    referenceIds.push(reference_id)
    wallet.balance += parseFloat(amount)

    res.json({
      data: {
        deposit: {
          id: uuidv4(),
          deposited_by: wallet.owned_by,
          deposited_at: new Date().toISOString(),
          amount: parseFloat(amount),
          reference_id,
          status: "success",
        },
      },
      status: "success",
    })
  }
)

// Use virtual money from my wallet
router.post(
  "/wallet/withdrawals",
  [authenticate, checkWalletStatus],
  (req, res) => {
    const { amount, reference_id } = req.body

    if (amount > wallet.balance) {
      res
        .status(400)
        .json(generateError("Amount withdrawn cannot exceed current balance"))
      return
    }

    if (!referenceIds) {
      res.status(400).json(generateError("Reference ID is required."))
      return
    }
    if (referenceIds.includes(reference_id)) {
      res.status(400).json(generateError("Reference ID must be unique"))
      return
    }

    referenceIds.push(reference_id)
    wallet.balance -= parseFloat(amount)

    res.json({
      data: {
        withdrawal: {
          id: uuidv4(),
          withdrawn_by: wallet.owned_by,
          status: "success",
          withdrawn_at: new Date().toISOString(),
          amount: parseFloat(amount),
          reference_id,
        },
      },
      status: "success",
    })
  }
)

// Enable My Wallet
router.post("/wallet", authenticate, (_, res) => {
  if (wallet.status) {
    res.status(400).json(generateError("Wallet already enabled"))
    return
  }

  wallet.status = true
  wallet.enabled_at = new Date().toISOString()

  res.json({
    data: {
      wallet: {
        id: wallet.id,
        owned_by: wallet.owned_by,
        status: wallet.status,
        enabled_at: wallet.enabled_at,
        balance: wallet.balance,
      },
    },
    status: "success",
  })
})

// Disable My Wallet
router.patch("/wallet", authenticate, (req, res) => {
  const { is_disabled } = req.body
  wallet.status = is_disabled ? false : true
  wallet.disabled_at = new Date().toISOString()

  res.json({
    data: {
      wallet: {
        id: wallet.id,
        owned_by: wallet.owned_by,
        status: wallet.status,
        disabled_at: wallet.disabled_at,
        balance: wallet.balance,
      },
    },
    status: "success",
  })
})

app.listen(port, () => {
  console.log(`Mini Wallet Mock API listening at http://0.0.0.0:${port}`)
})
