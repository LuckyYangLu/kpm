/**
 * 加密解密
 */

import crypto from 'crypto';
import publicKey from '@/assets/ca/publicKey';
import privateKey from '@/assets/ca/privateKey';

/**
 * 非对称公钥加密
 * @param {String} data 需要加密的明文
 * @return key 加密后的密文
 */
export function publicEncrypt (data) {
  return new Promise((resolve, reject) => {
    try {
      // 公钥加密明文
      data = Buffer.from(data.toString('hex'), 'hex');
      var encrypt = crypto.publicEncrypt(publicKey, data);
      resolve(encrypt);
    } catch (err) {
      reject(err);
    }
  });
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
    cryptSalt = Buffer.from(cryptSalt, 'hex');
    var decrypt = crypto.privateDecrypt(privateKey, cryptSalt);
    decrypt = decrypt.toString('hex');

    // 秘钥解密密文
    const decipher = crypto.createDecipher('aes192', decrypt);
    let decrypted = decipher.update(cryptKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    resolve({
      key: decrypted
    });
  });
}