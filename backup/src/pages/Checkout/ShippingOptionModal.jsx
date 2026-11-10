// css
import "./ShippingOptionModal.css";

export default function ShippingOptionModal({ toggleShippingOptionModal }) {
  return (
    <>
      <dialog
        className="shipping-modal-wrapper"
        onClick={toggleShippingOptionModal}
      >
        <div
          className="shipping-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <h1 className="shipping-modal-title">Select Shipping Option</h1>
          <div className="shipping-options-wrapper">
            <label className="modal-shipping-option">
              <input type="radio" name="shipping-option" />
              <div className="shipping-modal-option-title-wrapper">
                <p className="modal-shipping-option-date">13- 14 Oct</p>
                <span>$10.00</span>
              </div>
              <p>Standard Delivery</p>
            </label>
            <label className="modal-shipping-option">
              <input type="radio" name="shipping-option" />
              <div className="shipping-modal-option-title-wrapper">
                <p className="modal-shipping-option-date">13- 14 Oct</p>
                <span>$20.00</span>
              </div>
              <p>Next day Delivery</p>
            </label>
            <label className="modal-shipping-option">
              <input type="radio" name="shipping-option" />
              <div className="shipping-modal-option-title-wrapper">
                <p className="modal-shipping-option-date">13- 14 Oct</p>
                <span>$30.00</span>
              </div>
              <p>Order Before 3pm</p>
              <p>Instant Delivery</p>
            </label>
          </div>
          <div className="shipping-modal-footer">
            <button
              className="shipping-modal-cancel-btn"
              onClick={toggleShippingOptionModal}
            >
              Cancel
            </button>
            <button className="shipping-modal-confirm-btn">Confirm</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
