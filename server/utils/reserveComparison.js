export default function verifyToken (totalSupply, reserveBalance) {
    return parseFloat(reserveBalance) >= parseFloat(totalSupply)
}