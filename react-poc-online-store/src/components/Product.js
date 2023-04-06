const Product = ({product}) => {
    const {name} = product;

    return ( 
        <div className="product">
            {name}
        </div> 
    );
  }

  export default Product;