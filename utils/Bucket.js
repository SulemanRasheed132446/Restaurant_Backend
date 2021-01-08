const {bucket} = require('./firebase');
const {uuid} = require('uuidv4')

function generateMetadataObject(fileName) {
    const token = uuid();
    const metaData = {
      contentType: `image/jpeg`,  // contentType IS OPTIONAL CAUSE IT WILL BE AUTO-INFERRED
      cacheControl: `public,max-age=31536000,must-revalidate`,  // YOU CAN ALSO USE IT TO ADD OTHER METADATA LIKE cacheControl
      contentDisposition: `inline; filename*=utf-8''${fileName}`,
      metadata: {
        firebaseStorageDownloadTokens: token
      }
    };
    return {
        metaData,
        token
    }
}

async function uploadImage (path, destinationPath) {
    const {metaData, token} = await generateMetadataObject(path);
    await bucket.upload(path, {
        metadata: metaData,
        destination: destinationPath
    })
    return `https://firebasestorage.googleapis.com/v0/b/${'restaurant-dev-3c85f.appspot.com'}/o/${path}?alt=media&token=${token}`
}

module.exports = {
    uploadImage
}