import crypto from 'crypto'

const generateDiscountCode = ()=>{
    return crypto.randomBytes(6).toString('hex');
}

export default generateDiscountCode;