
export const isBrowser =  typeof window !== "undefined";


export class LocalStorage {
   static set(key:string,value:any){
      if(isBrowser){
         localStorage.setItem(key, JSON.stringify(value));
      }
}
 static get(key:string){
   if(isBrowser){
      const value = localStorage.getItem(key)

      if(value){
         return JSON.parse(value)
      }
   }
   return null;
 }

 static remove(key:string){
   if(isBrowser){
      localStorage.removeItem(key)
   }
 }

 static clear(){
   if(isBrowser){
      localStorage.clear()
   }
 }

}
