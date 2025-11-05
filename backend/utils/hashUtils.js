import fs from 'fs';
import crypto from 'crypto';


export function fileHash(filePath, algo = 'md5') {
const hash = crypto.createHash(algo);
const data = fs.readFileSync(filePath);
hash.update(data);
return hash.digest('hex');
}