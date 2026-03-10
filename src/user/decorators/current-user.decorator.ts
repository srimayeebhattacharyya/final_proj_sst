import { from } from "rxjs";
import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
export const CurrentUser=createParamDecorator(
  (data:never,context:ExecutionContext)=>{
    const request=context.switchToHttp().getRequest()
    return request.currentUser;
    // console.log(request.session.userId);
    // return 'hi there!'
  }
)
//we use createParamDecorator to create a custom decorator that can be used to extract the currently signed in user from the request object. The createParamDecorator function takes a callback function as an argument, which will be called with the data passed to the decorator and the execution context of the request. In this case, we are not using any data, so we pass 'never' as the type of the data. The callback function extracts the request object from the execution context and returns a string 'hi there!' for now. We will later modify this function to return the actual user object instead of a string.
//ExecutionContext is an interface that provides methods to access the details of the current request being processed. It allows us to access the request and response objects, as well as other details about the request such as the route parameters, query parameters, and body of the request. In this case, we are using the switchToHttp() method to get the HTTP request object from the execution context, which we can then use to access the session and extract the userId from it.