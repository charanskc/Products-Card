import './App.css';
import {BrowserRouter as Router,Routes,Route,Link,Outlet,useParams} from "react-router-dom";
import {motion,AnimatePresence, AnimateSharedLayout} from "framer-motion";


function App() {
  return (
    <AnimateSharedLayout type="crossfade">
    <div className="App">
      <Router>

        <nav>
          <Link to="/"> Home </Link>
          <Link to="/products"> Products </Link>
        </nav>

        <Routes>
          <Route path="/" element ={ <Home/> } />
          <Route path="products" element ={ <Title/> } >
            <Route path="" element={<Product/>} />
            <Route path=":slug" element={<LaunchProduct />} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
    </AnimateSharedLayout>
  );
}

function NotFound(){
  return (
    <div>
      <h1>Page not Found or Invalid url or try going to products page.</h1>
    </div>
  )
}

function LaunchProduct(){
  const {slug} = useParams();
  const shoe = shoes[slug];

  if(!shoe){
    return (<h1>Not Found!</h1>);
  }

  const {name,img,price}  = shoe;

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1,
    transitionDelay:3}} exit={{opacity:0}} className='Product__Card'>
      <motion.img layoutId={slug}  src={img} alt={name}/>
      <div className='Product__details'>
        <h3>{name}</h3>
        <p>{price}</p>
        <button>Buy Now</button>
      </div>
    </motion.div>
  )
}

function Home(){

  return (
      <h1> Nothing here. Try going to Products Page. </h1>
  );

}

function Title(){
  return (
    <div>
    <h1>Products</h1>
    <Outlet/>
    </div>
  );
}

function Product(){
  return (
    
      <ul>
          {Object.entries(shoes).map(([slug,{name,img}]) => (
          <li key={slug} > 
            <Link to= {`/products/${slug}`}>
            <motion.img layoutId={slug}  whileHover={{
              scale:1.05,
              // boxShadow: "0 0 0.2rem grey"
            }} src={img} alt={name} /> 
            <h2>{name}</h2> 
            </Link>
          </li> 
          ))}
      </ul>
  );
}

const shoes = {
  "air-jordan-3-valor-blue": {
    name: "VALOUR BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CT8532_104_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price:"$365.00"
  },
  "jordan-mars-270-london": {
    name: "JORDAN MARS 270 LONDON",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CV3042_001_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price:"$130.21"
  },
  "air-jordan-1-zoom-racer-blue": {
    name: "RACER BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CK6637_104_A_PREM?$SNKRS_COVER_WD$&align=0,1",
    price:"$432.54"
  }
};

export default App;
