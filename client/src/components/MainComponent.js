// import React, {  useEffect, useState } from "react";
// import Child from "../components/Child";
// import image from "../images/img.avif";
// import axios from 'axios';
// import Crud from "./Crud";



// const MainComponent = () => {
//   var paragraph =
//     "React manages the view layer of an application. It allows you to build reusable UI components and manage UI state efficiently. However, React doesn’t deal with things like routing, HTTP requests, or database interactions on its own";
//   const data = [
//     { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
//     { id: 2, name: "Jane Smith", age: 22, email: "jane@example.com" },
//     { id: 3, name: "Bob Johnson", age: 35, email: "bob@example.com" },
//   ];
//   const arr = [
//     "Code is like humor. When you have to explain it, it’s bad.",
//     "First, solve the problem. Then, write the code.",
//     "Experience is the name everyone gives to their mistakes.",
//     "In order to be irreplaceable, one must always be different.",
//     "Simplicity is the soul of efficiency.",
//   ];
//   const flowerArray = [
//     {
//       name: "Rose",
//       imageUrl:
//         "https://images.pexels.com/photos/516/hands-woman-photography-children.jpg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       name: "Tulip",
//       imageUrl:
//         "https://images.pexels.com/photos/19339590/pexels-photo-19339590/free-photo-of-a-house-with-a-snow-covered-roof-and-a-fence.jpeg?auto=compress&cs=tinysrgb&w=800",
//     },
//     {
//       name: "Sunflower",
//       imageUrl:
//         "https://images.pexels.com/photos/3377776/pexels-photo-3377776.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//     },
//     {
//       name: "Lily",
//       imageUrl:
//         "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       name: "Daisy",
//       imageUrl:
//         "https://images.pexels.com/photos/4036551/pexels-photo-4036551.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//     },
//     {
//       name: "Orchid",
//       imageUrl:
//         "https://images.pexels.com/photos/296649/pexels-photo-296649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//   ];

//   const x = true;
//   const inputValue = "Aryadevi";
//   const [count, setCount] = useState(0);
//   const handleIncrement = () => {
//     setCount(count + 1);
//   };
//   const handleDecrement = () => {
//     setCount(count - 1);
//   };
//   const [name, setName] = useState("");
//   const handleInputChange = (event) => {
//     setName(event.target.value);
//   };
//   const [inputName, setInputName] = useState("");
//   const [productData, setProductData] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Hello ${inputName}`);
//     setInputName('')
//   };

//   const [dataFromChild, setDataFromChild] = useState(null);

//   const handleDataFromChild = (data) => {
//     setDataFromChild(data);
//   };
//   var options = {
//     headers: {'Accept':'application/json'},
//     params: {
//         'name':'arya'
//     }
// }
//   useEffect(()=>{
//     axios.get('https://demo-blog.mashupstack.com/api/posts',options).then(response=>{
//       console.log(response.data);
      
//       // this.setState({posts:response.data})
//   }).catch(error=>{
//       console.log(error)
//   });
//   },[])
 
//   return (
//     <div>
//       <h1 className="text-center text-success">Hello World</h1>
//       <h3 style={{ color: "gray" }}>{paragraph}</h3>
//       <h3 className="heading">{paragraph}</h3>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((user) => (
//             <tr>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.age}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <img
//         style={{ width: "300px", marginTop: "50px" }}
//         src="https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg"
//         alt=""
//       />
//       <img
//         style={{ width: "340px", marginTop: "50px", marginLeft: "50px" }}
//         src={image}
//         alt=""
//       />
//       <h1 className="text-white mt-5 text-center bg-secondary">
//         Is it {x.toString()}
//       </h1>
//       <input className="ml-5" type="text" value={inputValue} name="" id="" />
//       <ul>
//         {arr.map((item) => (
//           <li>{item}</li>
//         ))}
//       </ul>

//       <div className="container">
//         <div className="row">
//           {flowerArray.map((item) => (
//             <div className="col-md-4 d-flex justify-content-center mb-4">
//               <div>
//                 <h3 className="text-center">{item.name}</h3>
//                 <img
//                   style={{ width: "200px" }}
//                   src={item.imageUrl}
//                   alt="flower"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="btn-secondary mb-5 mt-4"
//         onDoubleClick={() => {
//           console.log("cliked");
//         }}
//       >
//         double click
//       </button>
//       <div className="p-5 ml-5 mr-5 mb-5 border">
//         <p></p>
//         <button onClick={handleIncrement}>Increment</button>
//         <button onClick={handleDecrement}>Decrement</button>
//         <h3>count : {count}</h3>
//       </div>
//       <div className="p-5 ml-5 mr-5 mb-5 border">
//         <p>Outputting the value entered by the user in input field</p>
//         <input type="text" value={name} onChange={handleInputChange} />
//         <h3>Hello {name}</h3>
//       </div>
//       <div className="p-5 ml-5 mr-5 mb-5 border">
//         <h5>Form</h5>
//         <form action="" onSubmit={handleSubmit}>
//           <label htmlFor="name">Name : </label>
//           <input
//             type="text"
//             value={inputName}
//             onChange={(e) => setInputName(e.target.value)}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       <Child onDataFromChild={handleDataFromChild} setDataFromChild={setDataFromChild}/>
//       <h4> Data from child component : {dataFromChild} </h4>
//       <Crud/>
//     </div>
//   );
// };

// export default MainComponent;

import React from 'react';
import './Main.css'; // For additional custom styles

const MainComponent = () => {
  return (
    <div>
      <div className="container mt-2">
        {/* Image Slider */}
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          
          {/* Carousel Items */}
          <div className="carousel-inner">
            {/* First Slide */}
            <div className="carousel-item active">
              <div className="slide-design d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(45deg, #f06292, #ffcc80)', height: '500px' }}>
                <div className="text-center">
                  <h1 className="display-4 text-white">Gradient Delight</h1>
                  <p className="lead text-white">Soft transitions with smooth color blends.</p>
                </div>
              </div>
            </div>

            {/* Second Slide */}
            <div className="carousel-item">
              <div className="slide-design d-flex justify-content-center align-items-center" style={{ background: 'repeating-linear-gradient(45deg, #ffeb3b, #ffeb3b 10px, #ff9800 10px, #ff9800 20px)', height: '500px' }}>
                <div className="text-center">
                  <h1 className="display-4 text-dark">Patterned Vibrance</h1>
                  <p className="lead text-dark">Bold repeating patterns for a lively feel.</p>
                </div>
              </div>
            </div>

            {/* Third Slide */}
            <div className="carousel-item">
              <div className="slide-design d-flex justify-content-center align-items-center" style={{ background: 'radial-gradient(circle, #42a5f5, #7986cb)', height: '500px' }}>
                <div className="text-center">
                  <h1 className="display-4 text-white">Radial Calm</h1>
                  <p className="lead text-white">Soothing circular gradients for a peaceful vibe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Section with Additional Images */}
        <div className="row mt-5">
          <div className="col-md-4">
            <img src="https://img.freepik.com/premium-photo/laptop-with-blue-screen-that-says-macbook-pro_948904-438.jpg?w=1380" className="img-fluid rounded mb-4" alt="Image 6" />
          </div>
          <div className="col-md-4">
            <img src="https://img.freepik.com/premium-psd/laptop-mock-up-isolated_1310-1482.jpg?w=2000" className="img-fluid rounded mb-4" alt="Image 7" />
          </div>
          <div className="col-md-4">
            <img src="https://img.freepik.com/free-vector/smartphone-with-different-views-realistic-style_23-2147849864.jpg?t=st=1728645605~exp=1728649205~hmac=e20329ed4cc66ad318054335a602f41b522202bdb3ecb0e50508972bf3d68cdc&w=1380" className="img-fluid rounded mb-4" alt="Image 8" />
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <img src="https://img.freepik.com/premium-photo/3d-ui-icons-set-technology-isolated-white-background_1029469-271014.jpg?w=1380" className="img-fluid rounded" alt="Gallery Image 1" />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <img src="https://img.freepik.com/premium-psd/mockup-luxury-car_110488-1898.jpg?w=2000" className="img-fluid rounded" alt="Gallery Image 2" />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <img src="https://img.freepik.com/free-photo/3d-racing-car_1048-5051.jpg?t=st=1728646334~exp=1728649934~hmac=312d908498a2b77138f8b283a42e7c5f6f456543a34573d1e505c9c7cefa4300&w=2000" className="img-fluid rounded" alt="Gallery Image 3" />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <img src="https://img.freepik.com/premium-psd/three-dimensional-image-mobile-phone_53876-1606.jpg?w=1480" className="img-fluid rounded" alt="Gallery Image 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
