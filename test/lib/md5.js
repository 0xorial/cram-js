const { sequenceMD5 } = require('../../src/cramFile/util')
const seq = require('fs')
  .readFileSync(process.argv[2])
  .toString()

//console.log(process.argv)
console.log(seq.replace(/\s/g,'').length, sequenceMD5(seq))