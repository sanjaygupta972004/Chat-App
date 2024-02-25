const bgImage :string =  "src/assets/bg.png";
export default bgImage;
 
type Image = {
   url1: string;
   url2: string;
   url3: string;
   notFound: string;
   emailVerification: string;
}
const images: Image = {
   url1: "https://images.pexels.com/photos/7130495/pexels-photo-7130495.jpeg?auto=compress&cs=tinysrgb&w=600",
   url2: "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=600",
   url3: "https://images.pexels.com/photos/7130535/pexels-photo-7130535.jpeg?auto=compress&cs=tinysrgb&w=600",
   notFound: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   emailVerification : "https://www.pcworld.com/wp-content/uploads/2023/04/gmail_logo-100758589-orig.jpg?quality=50&strip=all"
} 
export  {images};