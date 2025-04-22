import express from 'express'
import zkFetchBank from '../utils/zkFetchBank.js'
import verifyToken from '../utils/reserveComparison.js'

const router = new express.Router()

router.post('/verify', async (req, res) => {
    try {
    // Pass token after logging in and RWA supply after connecting wallet
    const { token, RWASupply } = req.body

    if (!token) {
        return res.status(400).json({ message: 'Token not provided in request body' })
    }

    // Call zkFetch
    const zkResult = await zkFetchBank(token)
    const { proof, balance } = zkResult
    const { claimData, signatures, extractedParameterValues } = balance
  
    // Access the actual balance if extracted
    const extractedBalance = extractedParameterValues?.balance

    // Compare balance and supply
    const result = verifyToken(RWASupply, extractedBalance)
    res.json({ success: true, balance: extractedBalance, supply: RWASupply, message: result })
    } catch (err) {
        res.json({ success: false, message: err })
    }
})

export default router
