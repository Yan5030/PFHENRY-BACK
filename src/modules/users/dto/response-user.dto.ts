export class ResponseUserDto{
    email: string   
    name: string
    password: string
    address: string
    image_url : string
 
    constructor(data: Partial<ResponseUserDto>) {
      const { password, ...rest } = data as any; 
      Object.assign(this, rest);
    }


    }