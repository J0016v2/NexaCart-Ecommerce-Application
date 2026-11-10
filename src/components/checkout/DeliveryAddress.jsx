// icons
import { LocationAlt } from "reicon-react";

export default function DeliveryAddress() {
  return (
    <section className="address">
      <div className="address-header">
        <LocationAlt weight="Filled" color="#145936" />
        <h2>Delivery</h2>
      </div>
      <div className="delivery-details">
        <div className="reciever-details">
          <span className="reciever-name">Justine Leonardo</span>
          <span className="reciever-contact-number">+639320679300</span>
          <button className="change-address-btn">Change</button>
        </div>
        <p className="street-address">0079 M. Roxas Street</p>
        <p className="location-details">
          Taal, Bocaue, North Luzon, Bulacan 3018
        </p>
      </div>
    </section>
  );
}
