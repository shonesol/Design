window.virtualTryOn = function () {
  const userImg = document.getElementById("userPhoto").files[0];
  const clothImg = document.getElementById("clothPhoto").files[0];
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!userImg || !clothImg) {
    alert("Upload both images");
    return;
  }

  const userReader = new FileReader();
  const clothReader = new FileReader();

  userReader.onload = function (e1) {
    const user = new Image();
    user.src = e1.target.result;

    user.onload = function () {
      ctx.drawImage(user, 0, 0, 300, 400);

      clothReader.onload = function (e2) {
        const cloth = new Image();
        cloth.src = e2.target.result;

        cloth.onload = function () {
          // 👕 Overlay clothing on top
          ctx.globalAlpha = 0.85;

          ctx.drawImage(cloth, 50, 100, 200, 200);

          ctx.globalAlpha = 1.0;
        };
      };

      clothReader.readAsDataURL(clothImg);
    };
  };

  userReader.readAsDataURL(userImg);
};
