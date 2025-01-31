export class ResponseUserDto{
  id:string
  email: string  
  name: string
  password: string
  address: string
  image_url : string
  create_at:string

  constructor(data: Partial<ResponseUserDto>) {
    const { password, ...rest } = data as any;
    Object.assign(this, rest);
  }




  }
