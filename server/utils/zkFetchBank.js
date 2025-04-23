import { ReclaimClient } from '@reclaimprotocol/zk-fetch'
import { transformForOnchain, verifyProof } from '@reclaimprotocol/js-sdk'
import dotenv from 'dotenv'

dotenv.config()

// Simulate zkfetch backend fetch and verification
const reclaimClient = new ReclaimClient(process.env.APP_ID, process.env.APP_SECRET)

export default async function zkFetchBank (token) {
console.log("Starting zkfetch_demo...");
    try {
    console.log("Token received:", token)
    console.log("Calling zkFetch...")
    const protectedRes = await reclaimClient.zkFetch('https://mockup-backend-seven.vercel.app/balance', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, {
      responseMatches: [{
        type: "regex",
        value: '"balance":(?<balance>\\d+)',
      }],
      responseRedactions: [{
        regex: '"balance":(?<balance>\\d+)',
      }]
    });

    if (!protectedRes) {
      console.log("zkFetch returned null or undefined")
      return { success: false, error: 'failed to generate proof' }
    }

    console.log("zkFetch returned data, verifying...")
    const isBalanceValid = await verifyProof(protectedRes)
    console.log("Proof verification result:", isBalanceValid)

    if (!isBalanceValid) {
      return { success: false, error: 'Proof is invalid' }
    }

    const data = await transformForOnchain(protectedRes)
    console.log("Final transformed data:", data)

    return { success: true, proof: data, balance: protectedRes }

  } catch (err) {
    console.error("Error in zkfetch_demo:", err)
    return { success: false, error: err.message || err }
  }
}
