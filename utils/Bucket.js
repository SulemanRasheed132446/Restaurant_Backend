const {bucket} = require('./firebase');
const {uuid} = require('uuidv4')

function generateMetadataObject({fileName, mimeType}) {
    const token = uuid();
    const metadata = {
      contentType: `image/jpeg`,  // contentType IS OPTIONAL CAUSE IT WILL BE AUTO-INFERRED
      cacheControl: `public,max-age=31536000,must-revalidate`,  // YOU CAN ALSO USE IT TO ADD OTHER METADATA LIKE cacheControl
      contentDisposition: `inline; filename*=utf-8''${fileName}`,
      metadata: {
        firebaseStorageDownloadTokens: token
      }
    };
    return {
        metadata,
        token
    }
}

async function uploadImage (file, destinationPath) {
    const {stream, filename, mimetype, encoding} =  await file
    const fireStorageFile = bucket.file(`${destinationPath}`)
    const {metadata, token} = generateMetadataObject({fileName: filename, mimetype})
    const writeStream = fireStorageFile.createWriteStream({
       metadata,
    })

    const result =  new Promise((resolve, reject) =>{
       writeStream.on('error', function (err) {
          reject(err);
       });
       writeStream.on('finish', function () {	
          resolve(`https://firebasestorage.googleapis.com/v0/b/${'restaurant-dev-3c85f.appspot.com'}/o/${destinationPath}?alt=media&token=${token}`);
        });
    })

    stream.pipe(writeStream)
    return result
}

module.exports = {
    uploadImage,
    generateMetadataObject
}