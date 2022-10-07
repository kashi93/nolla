import bcrypt from "bcrypt";

class Hash {
  make(plainText: string): Promise<string> {
    return new Promise<string>((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainText, salt, function (err, hash) {
          res(hash);
        });
      });
    });
  }
  verify(plainText: string, hashText: string) {
    return new Promise((res, rej) => {
      bcrypt.compare(plainText, hashText, function (err, result) {
        res(result);
      });
    });
  }
}

export default new Hash();
