import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
// import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor{
  new (...args:any[]):{} // This is a type that represents a class constructor. It takes any number of arguments and returns an object.'...args' means that the constructor can take any number of arguments of any type. The 'new' keyword indicates that this is a constructor function that can be used to create instances of a class. The ':{}' part indicates that the constructor returns an object of any type. This interface is used to define the type of the 'dto' property in the SerializeInterceptor class, which is a class constructor that will be used to create instances of the DTO class when serializing the response.
}

export function Serialize(dto:ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto:ClassConstructor){}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Run something before a request is handled by the request handler
    // console.log('I am running before the handler',context)
    return handler.handle().pipe(
      map((data:any)=>{
        //Run something before the response is sent out
        //console.log('I am running before the response is sent out',data)
        return plainToClass(this.dto,data,{
          excludeExtraneousValues:true //This will exclude all the properties that are not decorated with @Expose() in the UserDto class
        })
      })
    )
  }
}