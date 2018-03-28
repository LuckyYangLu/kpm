/* 加密解密 */

import crypto from 'crypto'
import publicKey from '@/assets/ca/publicKey'
import privateKey from '@/assets/ca/privateKey'

/*
 * @name 非对称加密 + 对称加密
 * @params data 需要加密的明文
 * @return key 加密后的密文
 * @return digest 加密后秘钥
 */
export function Crypto (data) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, (err, key) => {
      if (err) return reject(err)
      key.toString('hex')

      // 秘钥加密密码
      const cipher = crypto.createCipher('aes192', key)
      let encrypted = cipher.update(data, 'utf8', 'hex')
      encrypted += cipher.final('hex')

      // 公钥加密秘钥
      key = Buffer.from(key, 'hex')
      var encrypt = crypto.publicEncrypt(publicKey, key)

      resolve({
        key: encrypted,
        digest: encrypt
      })
    })
  })
}

/*
 * @name 非对称解密 + 对称解密
 * @params cryptKey 对称加密后的密文
 * @params cryptSalt 非对称加密后的秘钥
 * @return decrypted 解密后的明文
 */
export function decipher (cryptKey, cryptSalt) {
  return new Promise((resolve, reject) => {
    // 公钥解密秘钥
    cryptSalt = Buffer.from(cryptSalt, 'hex')
    var decrypt = crypto.privateDecrypt(privateKey, cryptSalt)
    decrypt = decrypt.toString('hex')

    // 秘钥解密密文
    const decipher = crypto.createDecipher('aes192', decrypt)
    let decrypted = decipher.update(cryptKey, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    resolve({
      key: decrypted
    })
  })
}