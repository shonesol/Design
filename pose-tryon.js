const videoElement = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let clothImage = null;

// Load clothing
document.getElementById("clothPose").addEventListener("change", function (e) {
  const reader = new FileReader();

  reader.onload = function (event) {
    clothImage = new Image();
    clothImage.src = event.target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
});

// Start camera + pose detection
window.startPoseTryOn = async function () {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;

  const pose = new Pose.Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  pose.onResults(onResults);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: 300,
    height: 400
  });

  camera.start();
};

function onResults(results) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw camera feed
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  if (results.poseLandmarks && clothImage) {
    const leftShoulder = results.poseLandmarks[11];
    const rightShoulder = results.poseLandmarks[12];

    const x = leftShoulder.x * canvas.width;
    const y = leftShoulder.y * canvas.height;

    const width =
      (rightShoulder.x - leftShoulder.x) * canvas.width * 2;

    const height = width * 1.2;

    ctx.globalAlpha = 0.8;
    ctx.drawImage(clothImage, x - 20, y - 20, width, height);
    ctx.globalAlpha = 1.0;
  }
}
