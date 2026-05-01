

const ProductPage = ({ params }) => {
    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {params.id}</p>
        </div>
    );
};

export default ProductPage;