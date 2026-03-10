import { Expose,Exclude } from "class-transformer";
//Expose->Share specifically the property
//Exclude->Do not share specifically the property
export class UserDto{
  @Expose()
  id:number;
  
  @Expose()
  name:string;

  @Expose()
  email:string;
}