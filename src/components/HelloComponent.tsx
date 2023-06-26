import { useEffect } from "react";

const HelloComponent = (message:string, componentName:string) => {
    useEffect(() => {
      console.log(`${message} ${componentName}`);
    }, [message,componentName]);
  };
  

  export default HelloComponent