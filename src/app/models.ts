export class Circle {
    constructor(
      private x: number, 
      private y: number, 
      private radius: number,
      private color: string,
      private speedX: number,
      private speedY: number) {}
  
    public draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    public move(ctx: CanvasRenderingContext2D) {
      if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.speedX = -this.speedX;
      }
      if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;
  
      this.draw(ctx);
    }
  }
  
  export interface Login {
    id?: number,
    email: string,
    password: string
  }
  
  export class User {
    constructor(
      public login: string,
      public first_name: string,
      public last_name: string,
      public bio: string,
      public location: string,
      public profile_image: string = '../assets/avatar.jpg',
      public id?: number,
    ) {}
  }
  export class Photo {
    constructor(
      public created_at: string,
      public description: string,
      public categories: string[],
      public likes_count: number,
      public liked_by: string[],
      public url: string,
      public comments: Comment[],
      public id: number,
      public userId: number
    ) {}
  }
  
  export class Comment {
    constructor(
      public user: string,
      public text: string,
      public date: string,
      public id?: number
    ) {}
  }