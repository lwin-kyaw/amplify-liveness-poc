const { Rekognition } = require("@aws-sdk/client-rekognition");

const getRekognitionClient = () => {
  const rekognitionClient = new Rekognition({
    region: 'ap-south-1'
  });

  return rekognitionClient;
};

module.exports = getRekognitionClient;