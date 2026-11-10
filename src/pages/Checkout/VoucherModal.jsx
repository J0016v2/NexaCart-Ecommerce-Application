// css
import "./VoucherModal.css";

export default function VoucherModal({ toggleVoucherModal }) {
  return (
    <>
      <dialog className="voucher-modal" onClick={toggleVoucherModal}>
        <div
          className="modal-voucher-wrapper"
          onClick={(event) => event.stopPropagation()}
        >
          <h1>Storename vouchers</h1>
          <div className="add-voucher-wrapper">
            <p>Add Voucher</p>
            <input type="text" placeholder="Shop voucher code" />
            <button className="add-voucher-btn">Apply</button>
          </div>
          <div className="available-vouchers-wrapper">
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
            <label className="voucher">
              <input
                className="voucher-input"
                type="radio"
                name="voucher"
                id=""
              />

              <h2 className="voucher-discount">$5 off</h2>
              <p className="voucher-requirement-display">Min. Spend $100.00</p>
            </label>
          </div>
          <div className="voucher-modal-footer">
            <button
              className="voucher-modal-cancel-btn"
              onClick={toggleVoucherModal}
            >
              Cancel
            </button>
            <button className="voucher-modal-confirm-btn">Confirm</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
