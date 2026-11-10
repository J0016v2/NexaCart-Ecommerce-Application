export default function ProductImageGallery({ product, selectedImage, onSelectImage }) {
  return (
    <div className="product-overview-image-grid">
      {product.images?.map((image, index) => {
        return (
          <label
            className="product-image-option"
            key={index}
            onClick={() => onSelectImage(image)}
          >
            <input
              type="radio"
              name="product-image-option"
              checked={selectedImage === image}
              onChange={() => onSelectImage(image)}
            />

            <img
              className="product-overview-variant-image"
              src={image}
              alt={`${product.title} ${index + 1}`}
            />
          </label>
        );
      })}
    </div>
  );
}
