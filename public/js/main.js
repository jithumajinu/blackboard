var canvas = document.getElementById('draw');
      var context = canvas.getContext('2d');

      

      var width = window.innerWidth;
      var height = window.innerHeight;
      var socket = io.connect('http://localhost:3000');
      var mouse = {
        click: false,
        move: false,
        pos: {x: 0, y: 0},
        pos_prev: false
      };

      canvas.width = width;
      canvas.height = height;
      context.lineWidth = 5;
      context.lineJoin = 'round';
      context.lineCap = 'round';

         
      canvas.onmousedown = function (e) { mouse.click = true };
      canvas.onmouseup = function (e) { mouse.click = false };

    //  context.clearRect(0, 0, 300, 20);

    document.getElementById('fileUpload').onchange = function(e) {
  var img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};
function draw() {
  console.log("uploadImage")
      var img = null;
      img = document.createElement("IMG");
      img.src="images/test.png" ;
      console.log(img)
      context.drawImage(this, 10, 10);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
   
    function uploadImage() {
      console.log("uploadImage")
      var img = null;
      img = document.createElement("IMG");
      img.src="images/test.png" ;
      console.log(img)
      context.drawImage(img, 10, 10);
    }


    function cleard() {
//console.log("ff");
//context.clearRect(0, 0, width, height);
socket.emit('draw', { action: "clear" });
   
};

      canvas.onmousemove = function (e) {

          var rect = this.getBoundingClientRect();

        //mouse.pos.x = (e.clientX / width);
       // mouse.pos.y = (e.clientY / height);
       mouse.pos.x = e.clientX - rect.left,
       mouse.pos.y = e.clientY - rect.top;
       mouse.move = true;
      };


      socket.on('draw', function (data) {
        console.log(2);
        
        if(data.action){
          console.log(data);
          context.clearRect(0, 0, width, height);
        }
        else{

        
       var line = data.line;
      // console.log(data);
        // context.beginPath();
        // context.moveTo(line[0].x * width, line[0].y * height);
        // context.lineTo(line[1].x * width, line[1].y * height);
        // context.stroke(); 
      //  context.strokeStyle = "#009933";
        context.strokeStyle = "#df4b26";
      
        context.beginPath();
        context.moveTo(line[0].x , line[0].y);
        context.lineTo(line[1].x, line[1].y);
       // context.strokeStyle = line[0].x;
        //context.lineWidth = line[0].y;
        
        context.stroke();
        context.closePath();
      }
        
      });


      function loop () {
        if (mouse.click && mouse.move && mouse.pos_prev) {
          console.log(1);
          socket.emit('draw', { line: [ mouse.pos, mouse.pos_prev ] });
          mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y:mouse.pos.y};
        setTimeout(loop, 25); 
      }

      loop();
     // document.getElementById("draw").style.cursor = "pointer";
     
    // cursor: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/happy.png")

    var tool = document.getElementById('tool');
    tool.addEventListener('change', function () {
        mode = tool.value;
        console.log(mode);
      });

    var brush = document.getElementById('brush');
    brush.addEventListener('change', function () {
        context.lineWidth  = brush.value;
        console.log(context.lineWidth);
      });