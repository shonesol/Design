window.virtualTryOn = function () {

    const userImg =
    document.getElementById("userPhoto").files[0];

    const clothImg =
    document.getElementById("clothPhoto").files[0];


    const canvas =
    document.getElementById("canvas");


    const ctx =
    canvas.getContext("2d");


    if(!userImg || !clothImg){

        alert("Upload both images");
        return;

    }



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    const userReader =
    new FileReader();



    userReader.onload = function(e){


        const user =
        new Image();


        user.src =
        e.target.result;



        user.onload=function(){


            canvas.width =
            400;

            canvas.height =
            600;



            // User image

            ctx.drawImage(
                user,
                0,
                0,
                400,
                600
            );



            const clothReader =
            new FileReader();



            clothReader.onload=function(e2){


                const cloth =
                new Image();


                cloth.src =
                e2.target.result;



                cloth.onload=function(){


                    ctx.globalAlpha =
                    0.75;



                    // Clothing position

                    ctx.drawImage(

                        cloth,

                        80,     // left

                        180,    // top

                        240,    // width

                        220     // height

                    );



                    ctx.globalAlpha =
                    1;


                };


            };


            clothReader.readAsDataURL(clothImg);


        };


    };



    userReader.readAsDataURL(userImg);


};
