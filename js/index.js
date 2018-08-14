function Starry(id) {
  //创建画布
  let canvas = document.getElementById(id);
  this.cxt = canvas.getContext("2d");
  //设置画布宽高 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.cW = canvas.width;
  this.cH = canvas.height;
  //设定圆点数量
  this.num = 120;
  this.data = [];
}
//面向对象的方扩展函数       
Starry.prototype = {
  //初始化
  init: function() {
    var speed = this.speed;
    for (let i = 0; i < this.num; i++) {
      this.data[i] = {
        x: Math.random() * this.cW,
        y: Math.random() * this.cH,
        cX: Math.random() * 0.1 - 0.05,
        cY: Math.random() * 0.1 - 0.05
      };
      this.drawPoint(this.data[i].x, this.data[i].y);
    }
    setInterval(() => {
      starry.movePoint()
    }, 35)
  },
  //绘制圆点
  drawPoint(x, y) {
    let cxt = this.cxt;
    cxt.save();
    cxt.fillStyle = "#20a7d0";
    cxt.beginPath(); //开始路径
    cxt.arc(x, y, 4, 0, Math.PI * 2, false);
    cxt.closePath(); //结束路径
    cxt.fill(); //填充方法
    cxt.restore(); //释放路径
  },
  //绘制线
  drawLine(x1, y1, x2, y2) {
    let cxt = this.cxt;
    let color = cxt.createLinearGradient(x1, y1, x2, y2);
    color.addColorStop(0, "skyblue");
    color.addColorStop(1, "darkblue");
    cxt.save();
    cxt.strokeStyle = color;
    cxt.beginPath(); //开始路径
    cxt.moveTo(x1, y1 - 2);
    cxt.lineTo(x2, y2 - 2);
    cxt.closePath(); //结束路径
    cxt.stroke(); //填充方法
    cxt.restore(); //释放路径
  },
  //
  movePoint() {
    let self = this;
    self.cxt.clearRect(0, 0, self.cW, self.cH);
    for (let i = 0; i < self.num; i++) {
      //控制圆点的移动范围
      self.data[i].x += self.data[i].cX;
      self.data[i].y += self.data[i].cY;
      if (self.data[i].x > self.cW || self.data[i].x < 0) {
        self.data[i].cX = -self.data[i].cX;
      }
      if (self.data[i].y > self.cH || self.data[i].y < 0) {
        self.data[i].cY = -self.data[i].cY;
      }
      //重新绘制圆点
      this.drawPoint(self.data[i].x, self.data[i].y);
      //判断两点之间距离小于指定值---->则绘制直线
      for (let j = i + 1; j < self.num; j++) {
        if (Math.pow(self.data[i].x - self.data[j].x, 2) + Math.pow(self.data[i].y - self.data[j].y, 2) <= 100 * 100) {
          self.drawLine(self.data[i].x, self.data[i].y, self.data[j].x, self.data[j].y);
        }
      }
    }
  }
}